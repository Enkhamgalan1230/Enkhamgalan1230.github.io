interface Env {
  ALLOWED_ORIGIN: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
}

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

function corsHeaders(origin: string, allowedOrigin: string) {
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? origin : allowedOrigin,
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
  if (!response.ok) throw new Error(`Spotify request failed: ${response.status}`);
  return response.json();
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin, env.ALLOWED_ORIGIN) });
    }

    const url = new URL(request.url);
    if (url.pathname === "/health") return json({ ok: true }, 200, origin, env);
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

      const [current, recent, artists, tracks] = await Promise.all([
        spotify("/me/player", token),
        spotify("/me/player/recently-played?limit=1", token),
        spotify("/me/top/artists?limit=5&time_range=medium_term", token),
        spotify("/me/top/tracks?limit=5&time_range=medium_term", token),
      ]);

      return json({
        current: current?.item ? { ...trackData(current.item), isPlaying: current.is_playing } : null,
        recent: recent?.items?.[0]?.track ? trackData(recent.items[0].track) : null,
        artists: (artists?.items ?? []).map(sanitizeArtist),
        tracks: (tracks?.items ?? []).map(trackData),
      }, 200, origin, env);
    } catch (error) {
      return json({ error: error instanceof Error ? error.message : "Spotify request failed" }, 502, origin, env);
    }
  },
};
