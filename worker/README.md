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

## Guestbook setup

The guestbook uses a Cloudflare D1 database. Create it once with Wrangler:

```bash
npx wrangler d1 create entwan-guestbook
npx wrangler d1 execute entwan-guestbook --remote --file=migrations/0001_guestbook.sql
npx wrangler d1 execute entwan-guestbook --remote --file=migrations/0002_guestbook_styles.sql
npx wrangler d1 execute entwan-guestbook --remote --file=migrations/0003_guestbook_text_styles.sql
npx wrangler d1 execute entwan-guestbook --remote --file=migrations/0004_guestbook_abuse_controls.sql
npx wrangler d1 execute entwan-guestbook --remote --file=migrations/0006_guestbook_green_colours.sql
npx wrangler d1 execute entwan-guestbook --remote --file=migrations/0007_guestbook_colour_choices.sql
npx wrangler d1 execute entwan-guestbook --remote --file=migrations/0008_guestbook_light_green_colours.sql
```

Copy the returned database ID into `wrangler.toml` in place of
`REPLACE_WITH_D1_DATABASE_ID`, then add the owner-only deletion token as an
encrypted Worker secret:

```bash
npx wrangler secret put GUESTBOOK_ADMIN_TOKEN
```

For the form-based owner mode, add a separate private trigger phrase. Do not
reuse a phrase that has been shared publicly:

```bash
npx wrangler secret put GUESTBOOK_ADMIN_TRIGGER
```

The public routes are `GET /api/guestbook` and `POST /api/guestbook`. To delete
an entry, send `DELETE /api/guestbook/{id}` with
`Authorization: Bearer <GUESTBOOK_ADMIN_TOKEN>`.

Each approved note receives a visitor-selected colour from the approved muted
green palette and one of five message fonts at the Worker, plus a random weight
and italic treatment, so visitors cannot submit arbitrary styles.

To activate moderation from the site, enter the name `entwan` and the private
trigger phrase as the note. That submission is not saved; instead, the Worker
issues a temporary 30-minute admin session and the delete buttons appear. The
session token is kept only in browser memory and is never included in the site
bundle or saved to storage.
