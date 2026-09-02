# Spotify Worker

This Worker keeps Spotify credentials off the public GitHub Pages site and
returns only the music data needed by the dialog.

## Cloudflare setup

Create a Worker from this folder, then add these as encrypted Worker secrets
under **Settings → Variables and Secrets**:

- `SPOTIFY_CLIENT_ID` — the Client ID
- `SPOTIFY_CLIENT_SECRET` — the Spotify Client Secret
- `SPOTIFY_REFRESH_TOKEN` — the long-lived refresh token

The Worker needs the Spotify redirect URI configured in Spotify as:

`https://enkhamgalan-spotify-api.zaecisama.workers.dev/oauth/callback`

The frontend endpoint will be:

`https://enkhamgalan-spotify-api.<your-cloudflare-subdomain>.workers.dev/api/spotify`

Keep the URL, but never expose the three secret values. Cloudflare documents
that Worker secrets are encrypted and should be added as secrets rather than
plain configuration variables.
