interface Env {
  ALLOWED_ORIGIN: string;
  SPOTIFY_REDIRECT_URI: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
}

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

function corsHeaders(origin: string, allowedOrigin: string) {
  const allowedOrigins = allowedOrigin
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const requestOrigin = allowedOrigins.includes(origin)
    ? origin
    : allowedOrigins[0] ?? "";

  return {
    "Access-Control-Allow-Origin": requestOrigin,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
  };
}

function json(data: unknown, status: number, origin: string, env: Env) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(origin, env.ALLOWED_ORIGIN),
    },
  });
}

async function getAccessToken(env: Env) {
  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!response.ok) throw new Error("Spotify token refresh failed");
  const token = await response.json<{ access_token: string }>();
  return token.access_token;
}

async function spotify(path: string, token: string) {
  const response = await fetch(`${SPOTIFY_API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 204) return null;
  if (!response.ok) {
    const error = new Error(`Spotify request failed: ${response.status}`) as Error & {
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
  error: unknown
) {
  const spotifyError = error as { status?: number };
  return {
    section,
    endpoint: path,
    status: spotifyError.status ?? 502,
    requiredScope: scope,
  };
}

function artistNames(artists: Array<{ name: string }> = []) {
  return artists.map((artist) => artist.name).join(", ");
}

function trackData(track: any) {
  return {
    name: track.name,
    artists: artistNames(track.artists),
    album: track.album?.name ?? "",
    image: track.album?.images?.[1]?.url ?? track.album?.images?.[0]?.url ?? "",
    url: track.external_urls?.spotify ?? "#",
  };
}

function sanitizeArtist(artist: any) {
  return {
    name: artist.name,
    url: artist.external_urls?.spotify ?? "#",
    image: artist.images?.[1]?.url ?? artist.images?.[0]?.url ?? "",
  };
}

function redirectUri(env: Env) {
  return env.SPOTIFY_REDIRECT_URI;
}

function setupRedirect(env: Env) {
  const state = crypto.randomUUID();
  const authorize = new URL("https://accounts.spotify.com/authorize");
  authorize.search = new URLSearchParams({
    client_id: env.SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: redirectUri(env),
    scope: "user-read-currently-playing user-read-recently-played user-top-read",
    state,
  }).toString();

  return new Response(null, {
    status: 302,
    headers: {
      Location: authorize.toString(),
      "Set-Cookie": `spotify_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Max-Age=600; Path=/`,
    },
  });
}

async function exchangeAuthorizationCode(code: string, env: Env) {
  const basic = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri(env),
    }),
  });

  if (!response.ok) throw new Error("Spotify authorization code exchange failed");
  return response.json<{ refresh_token?: string }>();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });
    }

    const url = new URL(request.url);
    if (url.pathname === "/health") return json({ ok: true }, 200, origin, env);

    if (url.pathname === "/oauth/start" && request.method === "GET") {
      return setupRedirect(env);
    }

    if (url.pathname === "/oauth/callback" && request.method === "GET") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      if (!code) return new Response("Missing Spotify authorization code.", { status: 400 });

      const savedState = request.headers.get("Cookie")?.match(/(?:^|; )spotify_oauth_state=([^;]+)/)?.[1];
      if (!state || !savedState || state !== savedState) {
        return new Response("Invalid Spotify authorization state.", { status: 400 });
      }

      try {
        const token = await exchangeAuthorizationCode(code, env);
        return new Response(
          token.refresh_token
            ? `Spotify authorization complete. Copy this refresh token into the Cloudflare secret named SPOTIFY_REFRESH_TOKEN:\n\n${token.refresh_token}\n\nThen delete this browser tab.`
            : "Spotify did not return a refresh token. Revoke the app and authorize again.",
          { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } }
        );
      } catch (error) {
        return new Response(error instanceof Error ? error.message : "Spotify authorization failed.", { status: 502 });
      }
    }

    if (url.pathname !== "/api/spotify" || request.method !== "GET") {
      return json({ error: "Not found" }, 404, origin, env);
    }

    try {
      const token = await getAccessToken(env);
      const type = url.searchParams.get("type") ?? "all";

      if (type === "search") {
        const query = url.searchParams.get("q")?.trim();
        if (!query) return json({ tracks: [] }, 200, origin, env);
        const result: any = await spotify(`/search?type=track&limit=6&q=${encodeURIComponent(query)}`, token);
        return json({ tracks: (result.tracks?.items ?? []).map(trackData) }, 200, origin, env);
      }

      const endpoints = [
        {
          section: "currentlyPlaying",
          path: "/me/player/currently-playing",
          scope: "user-read-currently-playing",
        },
        {
          section: "recentlyPlayed",
          path: "/me/player/recently-played?limit=1",
          scope: "user-read-recently-played",
        },
        {
          section: "topArtists",
          path: "/me/top/artists?limit=5&time_range=medium_term",
          scope: "user-top-read",
        },
        {
          section: "topTracks",
          path: "/me/top/tracks?limit=5&time_range=medium_term",
          scope: "user-top-read",
        },
      ];

      const settled = await Promise.allSettled(
        endpoints.map((endpoint) => spotify(endpoint.path, token))
      );

      const [currentResult, recentResult, artistsResult, tracksResult] = settled;
      const current = currentResult.status === "fulfilled" ? currentResult.value : null;
      const recent = recentResult.status === "fulfilled" ? recentResult.value : null;
      const artists = artistsResult.status === "fulfilled" ? artistsResult.value : null;
      const tracks = tracksResult.status === "fulfilled" ? tracksResult.value : null;
      const errors = settled.flatMap((result, index) =>
        result.status === "rejected"
          ? [safeEndpointError(
              endpoints[index].section,
              endpoints[index].path,
              endpoints[index].scope,
              result.reason
            )]
          : []
      );

      return json({
        current: current?.item ? { ...trackData(current.item), isPlaying: current.is_playing } : null,
        recent: recent?.items?.[0]?.track ? trackData(recent.items[0].track) : null,
        artists: (artists?.items ?? []).map(sanitizeArtist),
        tracks: (tracks?.items ?? []).map(trackData),
        errors,
      }, 200, origin, env);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Spotify request failed" }, 502, origin, env);
    }
  },
};
