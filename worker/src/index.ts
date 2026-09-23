import { generateAnswer } from "./entwan/rag/generate";
import { indexKnowledge } from "./entwan/rag/indexKnowledge";
import { retrieveKnowledge } from "./entwan/rag/retrieve";

interface Env extends Cloudflare.Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
  KUMO_INDEX_SECRET: string;
  GUESTBOOK_ADMIN_TOKEN: string;
  GUESTBOOK_ADMIN_TRIGGER: string;
  GUESTBOOK_DB: D1Database;
}

const SPOTIFY_TOKEN_URL =
  "https://accounts.spotify.com/api/token";

const SPOTIFY_API_URL =
  "https://api.spotify.com/v1";

function corsHeaders(
  origin: string,
  allowedOrigin: string,
) {
  const allowedOrigins = allowedOrigin
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const requestOrigin = allowedOrigins.includes(origin)
    ? origin
    : (allowedOrigins[0] ?? "");

  return {
    "Access-Control-Allow-Origin": requestOrigin,
    "Access-Control-Allow-Methods":
    "DELETE, GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization",
    "Cache-Control": "no-store",
  };
}

type GuestbookRow = {
  id: number;
  name: string;
  message: string;
  color: string;
  font: string;
  font_weight: string;
  font_style: string;
  visitor_id: string | null;
  created_at: string;
};

const guestbookColours = [
  "pale-sage", "soft-eucalyptus", "whisper-mint", "light-moss",
  "dusty-celadon", "faded-fern", "cream-sage", "gentle-olive",
  "airy-sage",
];
const guestbookFonts = ["serif", "mono", "grotesk", "soft", "display"];
const guestbookFontWeights = ["normal", "normal", "normal", "bold"];
const guestbookFontStyles = ["normal", "normal", "normal", "italic"];

function randomGuestbookChoice<T>(choices: T[]) {
  const random = new Uint32Array(1);
  crypto.getRandomValues(random);
  return choices[random[0] % choices.length];
}

const guestbookBlockedTerms = [
  "fuck", "shit", "bitch", "cunt", "asshole", "dick", "piss",
  "bastard", "motherfucker", "nigger", "faggot", "whore", "slut",
  "retard", "pisda", "pizda", "gichii", "zail", "zailaa", "gich",
  "sda", "zda", "zl", "zla",
];

function isGuestbookMessageBlocked(name: string, message: string) {
  const normalisedWithSpaces = `${name} ${message}`
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const normalised = normalisedWithSpaces.replace(/ /g, "");
  const tokens = new Set(normalisedWithSpaces.split(/\s+/));

  if (guestbookBlockedTerms.some((term) => term.length <= 3
    ? tokens.has(term)
    : normalised.includes(term))) return true;

  const words = message.toLocaleLowerCase().match(/[a-z0-9']+/g) ?? [];
  const repeatedCharacters = /(.)\1{7,}/i.test(normalised);
  const repeatedWords = words.length >= 3 && new Set(words).size <= 2;
  const excessiveLinks = (message.match(/https?:\/\//gi) ?? []).length > 2;

  return repeatedCharacters || repeatedWords || excessiveLinks;
}

function guestbookEntry(row: GuestbookRow) {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    color: row.color,
    font: row.font,
    fontWeight: row.font_weight,
    fontStyle: row.font_style,
    date: row.created_at,
  };
}

async function hashGuestbookToken(token: string) {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function hasGuestbookAdminAccess(request: Request, env: Env) {
  const authorization = request.headers.get("Authorization");
  if (authorization === `Bearer ${env.GUESTBOOK_ADMIN_TOKEN}`) return true;

  const sessionToken = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";
  if (!sessionToken || !env.GUESTBOOK_DB) return false;

  const tokenHash = await hashGuestbookToken(sessionToken);
  const session = await env.GUESTBOOK_DB.prepare(
    `SELECT token_hash
     FROM guestbook_admin_sessions
     WHERE token_hash = ? AND expires_at > datetime('now')
     LIMIT 1`,
  ).bind(tokenHash).first();

  return Boolean(session);
}

function json(
  data: unknown,
  status: number,
  origin: string,
  env: Env,
) {
  return new Response(
    JSON.stringify(data),
    {
      status,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
        ...corsHeaders(
          origin,
          env.ALLOWED_ORIGIN,
        ),
      },
    },
  );
}

async function getAccessToken(
  env: Env,
): Promise<string> {
  const basic = btoa(
    `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
  );

  const response = await fetch(
    SPOTIFY_TOKEN_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token:
          env.SPOTIFY_REFRESH_TOKEN,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      "Spotify token refresh failed",
    );
  }

  const token = await response.json<{
    access_token: string;
  }>();

  return token.access_token;
}

async function spotify(
  path: string,
  token: string,
): Promise<any> {
  const response = await fetch(
    `${SPOTIFY_API_URL}${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const error = new Error(
      `Spotify request failed: ${response.status}`,
    ) as Error & {
      path: string;
      status: number;
    };

    error.path = path;
    error.status = response.status;

    throw error;
  }

  return response.json();
}

function safeEndpointError(
  section: string,
  path: string,
  scope: string,
  error: unknown,
) {
  const spotifyError = error as {
    status?: number;
  };

  return {
    section,
    endpoint: path,
    status: spotifyError.status ?? 502,
    requiredScope: scope,
  };
}

function artistNames(
  artists: Array<{ name: string }> = [],
) {
  return artists
    .map((artist) => artist.name)
    .join(", ");
}

function trackData(track: any) {
  return {
    name: track.name,
    artists: artistNames(track.artists),
    album: track.album?.name ?? "",
    image:
      track.album?.images?.[1]?.url ??
      track.album?.images?.[0]?.url ??
      "",
    url:
      track.external_urls?.spotify ??
      "#",
  };
}

function redirectUri(env: Env) {
  return env.SPOTIFY_REDIRECT_URI;
}

function setupRedirect(env: Env) {
  const state = crypto.randomUUID();

  const authorize = new URL(
    "https://accounts.spotify.com/authorize",
  );

  authorize.search = new URLSearchParams({
    client_id:
      env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri:
      redirectUri(env),
    scope:
      "user-read-currently-playing user-read-recently-played user-top-read",
    state,
  }).toString();

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Set-Cookie":
        `spotify_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Max-Age=600; Path=/`,
    },
  });
}

async function exchangeAuthorizationCode(
  code: string,
  env: Env,
) {
  const basic = btoa(
    `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
  );

  const response = await fetch(
    SPOTIFY_TOKEN_URL,
    {
      method: "POST",
      headers: {
        Authorization:
          `Basic ${basic}`,
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type:
          "authorization_code",
        code,
        redirect_uri:
          redirectUri(env),
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      "Spotify authorization code exchange failed",
    );
  }

  return response.json<{
    refresh_token?: string;
  }>();
}

export default {
  async fetch(
    request: Request,
    env: Env,
  ): Promise<Response> {
    const origin =
      request.headers.get("Origin") ??
      "";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders(
          origin,
          env.ALLOWED_ORIGIN,
        ),
      });
    }

    const url =
      new URL(request.url);

    if (
      url.pathname === "/health"
    ) {
      return json(
        { ok: true },
        200,
        origin,
        env,
      );
    }

    if (
      url.pathname === "/api/guestbook" &&
      request.method === "GET"
    ) {
      if (!env.GUESTBOOK_DB) {
        return json({ error: "Guestbook database is not configured" }, 503, origin, env);
      }

      try {
        const result = await env.GUESTBOOK_DB.prepare(
          `SELECT id, name, message, color, font, font_weight, font_style, created_at
           FROM guestbook_entries
           WHERE status = 'approved'
           ORDER BY created_at DESC, id DESC
           LIMIT 100`,
        ).all<GuestbookRow>();

        return json(
          { entries: (result.results ?? []).map(guestbookEntry) },
          200,
          origin,
          env,
        );
      } catch (error) {
        console.error("Guestbook read failed:", error);
        return json({ error: "Could not load guestbook entries" }, 500, origin, env);
      }
    }

    if (
      url.pathname === "/api/guestbook" &&
      request.method === "POST"
    ) {
      if (!env.GUESTBOOK_DB) {
        return json({ error: "Guestbook database is not configured" }, 503, origin, env);
      }

      try {
        const contentLength = Number(request.headers.get("Content-Length") ?? 0);
        if (contentLength > 12000) {
          return json({ error: "Request is too large" }, 413, origin, env);
        }

        const visitorIp = request.headers.get("CF-Connecting-IP") ?? "unknown";
        const rateLimit = await env.KUMO_RATE_LIMITER.limit({
          key: `guestbook:${visitorIp}`,
        });
        if (!rateLimit.success) {
          return json({ error: "Too many attempts. Please try again later." }, 429, origin, env);
        }

        const body = await request.json<{
          name?: string;
          message?: string;
          color?: string;
          visitorId?: string;
        }>();
        const name = body.name?.trim() ?? "";
        const message = body.message?.trim() ?? "";
        const color = body.color?.trim() ?? "";
        const visitorId = body.visitorId?.trim() ?? "";

        if (!name || !message) {
          return json({ error: "Name and message are required" }, 400, origin, env);
        }

        if (name.length > 40 || message.length > 280) {
          return json({ error: "Name or message is too long" }, 400, origin, env);
        }

        if (!guestbookColours.includes(color)) {
          return json({ error: "Please choose a note colour" }, 400, origin, env);
        }

        if (!/^[a-z0-9-]{16,80}$/i.test(visitorId)) {
          return json({ error: "Could not verify this browser" }, 400, origin, env);
        }

        if (
          name.toLowerCase() === "entwan" &&
          Boolean(env.GUESTBOOK_ADMIN_TRIGGER) &&
          message === env.GUESTBOOK_ADMIN_TRIGGER
        ) {
          const sessionToken = `${crypto.randomUUID()}-${crypto.randomUUID()}`;
          const tokenHash = await hashGuestbookToken(sessionToken);
          await env.GUESTBOOK_DB.prepare(
            `INSERT INTO guestbook_admin_sessions (token_hash, expires_at)
             VALUES (?, datetime('now', '+30 minutes'))`,
          ).bind(tokenHash).run();

          return json(
            { adminSession: sessionToken },
            200,
            origin,
            env,
          );
        }

        const font = randomGuestbookChoice(guestbookFonts);
        const fontWeight = randomGuestbookChoice(guestbookFontWeights);
        const fontStyle = randomGuestbookChoice(guestbookFontStyles);

        if (isGuestbookMessageBlocked(name, message)) {
          return json(
            { error: "That note cannot be posted. Please keep it kind." },
            422,
            origin,
            env,
          );
        }

        const previousEntry = await env.GUESTBOOK_DB.prepare(
          "SELECT id FROM guestbook_entries WHERE visitor_id = ? LIMIT 1",
        ).bind(visitorId).first();
        if (previousEntry) {
          return json({ error: "You have already left a note." }, 409, origin, env);
        }

        const result = await env.GUESTBOOK_DB.prepare(
          `INSERT INTO guestbook_entries (name, message, color, font, font_weight, font_style, visitor_id)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           RETURNING id, name, message, color, font, font_weight, font_style, created_at`,
        ).bind(name, message, color, font, fontWeight, fontStyle, visitorId).first<GuestbookRow>();

        if (!result) {
          return json({ error: "Could not save note" }, 500, origin, env);
        }

        return json({ entry: guestbookEntry(result) }, 201, origin, env);
      } catch (error) {
        console.error("Guestbook write failed:", error);
        return json({ error: "Could not save note" }, 500, origin, env);
      }
    }

    const guestbookDeleteMatch = url.pathname.match(/^\/api\/guestbook\/(\d+)$/);
    if (guestbookDeleteMatch && request.method === "DELETE") {
      if (
        !env.GUESTBOOK_DB ||
        !(await hasGuestbookAdminAccess(request, env))
      ) {
        return json({ error: "Unauthorized" }, 401, origin, env);
      }

      try {
        const result = await env.GUESTBOOK_DB.prepare(
          "DELETE FROM guestbook_entries WHERE id = ?",
        ).bind(Number(guestbookDeleteMatch[1])).run();

        return json(
          { ok: true, deleted: result.meta.changes > 0 },
          200,
          origin,
          env,
        );
      } catch (error) {
        console.error("Guestbook delete failed:", error);
        return json({ error: "Could not delete note" }, 500, origin, env);
      }
    }

    if (
      url.pathname ===
        "/api/kumo/index" &&
      request.method === "POST"
    ) {
      const authorization =
        request.headers.get(
          "Authorization",
        );

      if (
        authorization !==
        `Bearer ${env.KUMO_INDEX_SECRET}`
      ) {
        return json(
          {
            error:
              "Unauthorized",
          },
          401,
          origin,
          env,
        );
      }

      try {
        const result =
          await indexKnowledge(env);

        return json(
          {
            ok: true,
            ...result,
          },
          200,
          origin,
          env,
        );
      } catch (error) {
        console.error(
          "Kumo indexing failed:",
          error,
        );

        return json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Knowledge indexing failed",
          },
          500,
          origin,
          env,
        );
      }
    }

    if (
      url.pathname ===
        "/api/kumo/retrieve" &&
      request.method === "GET"
    ) {
      const question =
        url.searchParams
          .get("q")
          ?.trim();

      if (!question) {
        return json(
          {
            error:
              "Missing q parameter",
          },
          400,
          origin,
          env,
        );
      }

      try {
        const matches =
          await retrieveKnowledge(
            env,
            question,
            8,
          );

        return json(
          {
            question,
            matches,
          },
          200,
          origin,
          env,
        );
      } catch (error) {
        return json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Retrieval failed",
          },
          500,
          origin,
          env,
        );
      }
    }

    if (
      url.pathname ===
        "/api/kumo/chat" &&
      request.method === "POST"
    ) {
      try {
        const body =
          await request.json<{
            message?: string;
          }>();

        const question =
          body.message?.trim();

        if (!question) {
          return json(
            {
              error:
                "Missing message",
            },
            400,
            origin,
            env,
          );
        }

        if (
          question.length > 1000
        ) {
          return json(
            {
              error:
                "Message is too long",
            },
            400,
            origin,
            env,
          );
        }

        const matches =
          await retrieveKnowledge(
            env,
            question,
            8,
          );

        const answer =
          await generateAnswer(
            env,
            question,
            matches,
          );

        return json(
          {
            answer,
          },
          200,
          origin,
          env,
        );
      } catch (error) {
        console.error(
          "Kumo chat failed:",
          error,
        );

        return json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Kumo failed to answer",
          },
          500,
          origin,
          env,
        );
      }
    }

    if (
      url.pathname ===
        "/oauth/start" &&
      request.method === "GET"
    ) {
      return setupRedirect(env);
    }

    if (
      url.pathname ===
        "/oauth/callback" &&
      request.method === "GET"
    ) {
      const code =
        url.searchParams.get(
          "code",
        );

      const state =
        url.searchParams.get(
          "state",
        );

      if (!code) {
        return new Response(
          "Missing Spotify authorization code.",
          {
            status: 400,
          },
        );
      }

      const savedState =
        request.headers
          .get("Cookie")
          ?.match(
            /(?:^|; )spotify_oauth_state=([^;]+)/,
          )?.[1];

      if (
        !state ||
        !savedState ||
        state !== savedState
      ) {
        return new Response(
          "Invalid Spotify authorization state.",
          {
            status: 400,
          },
        );
      }

      try {
        const token =
          await exchangeAuthorizationCode(
            code,
            env,
          );

        return new Response(
          token.refresh_token
            ? `Spotify authorization complete. Copy this refresh token into the Cloudflare secret named SPOTIFY_REFRESH_TOKEN:\n\n${token.refresh_token}\n\nThen delete this browser tab.`
            : "Spotify did not return a refresh token. Revoke the app and authorize again.",
          {
            headers: {
              "Content-Type":
                "text/plain; charset=utf-8",
              "Cache-Control":
                "no-store",
            },
          },
        );
      } catch (error) {
        return new Response(
          error instanceof Error
            ? error.message
            : "Spotify authorization failed.",
          {
            status: 502,
          },
        );
      }
    }

    if (
      url.pathname !==
        "/api/spotify" ||
      request.method !== "GET"
    ) {
      return json(
        {
          error: "Not found",
        },
        404,
        origin,
        env,
      );
    }

    try {
      const type =
        url.searchParams.get(
          "type",
        ) ?? "all";

      const token =
        await getAccessToken(env);

      if (type === "search") {
        const query =
          url.searchParams
            .get("q")
            ?.trim();

        if (!query) {
          return json(
            {
              tracks: [],
            },
            200,
            origin,
            env,
          );
        }

        const result =
          await spotify(
            `/search?type=track&limit=6&q=${encodeURIComponent(query)}`,
            token,
          );

        return json(
          {
            tracks: (
              result.tracks
                ?.items ?? []
            ).map(trackData),
          },
          200,
          origin,
          env,
        );
      }

      const endpoints = [
        {
          section:
            "currentlyPlaying",
          path:
            "/me/player/currently-playing",
          scope:
            "user-read-currently-playing",
        },
        {
          section:
            "recentlyPlayed",
          path:
            "/me/player/recently-played?limit=1",
          scope:
            "user-read-recently-played",
        },
      ];

      const settled =
        await Promise.allSettled(
          endpoints.map(
            (endpoint) =>
              spotify(
                endpoint.path,
                token,
              ),
          ),
        );

      const [
        currentResult,
        recentResult,
      ] = settled;

      const current =
        currentResult.status ===
        "fulfilled"
          ? currentResult.value
          : null;

      const recent =
        recentResult.status ===
        "fulfilled"
          ? recentResult.value
          : null;

      const errors =
        settled.flatMap(
          (result, index) =>
            result.status ===
            "rejected"
              ? [
                  safeEndpointError(
                    endpoints[index]
                      .section,
                    endpoints[index]
                      .path,
                    endpoints[index]
                      .scope,
                    result.reason,
                  ),
                ]
              : [],
        );

      const payload = {
        current:
          current?.item
            ? {
                ...trackData(
                  current.item,
                ),
                isPlaying:
                  current.is_playing,
                progress:
                  current.progress_ms,
                duration:
                  current.item
                    .duration_ms,
              }
            : null,

        recent:
          recent?.items?.[0]
            ?.track
            ? trackData(
                recent.items[0]
                  .track,
              )
            : null,

        artists: [],
        tracks: [],
        errors,
      };

      return json(
        payload,
        200,
        origin,
        env,
      );
    } catch (error) {
      return json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Spotify request failed",
        },
        502,
        origin,
        env,
      );
    }
  },
};
