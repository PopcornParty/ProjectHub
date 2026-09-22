# ProjectHub

**Find people. Build projects.**

This version uses **only a Discord application**. There is no Supabase and no extra website account.

Owner Discord ID (hardcoded): `1438172505423478916`

## What you set up

1. Create a Discord application at https://discord.com/developers/applications
2. Copy the **Application ID** (Client ID)
3. Paste it into `src/lib/config.ts` as `DISCORD_CLIENT_ID`
4. In Discord OAuth2 → Redirects add:

```
http://localhost:5173/auth/callback
https://popcornparty.github.io/ProjectHub/auth/callback
```

5. Enable GitHub Pages for this repo (Settings → Pages → GitHub Actions)

That is the whole setup.

## Run locally

```bash
npm install
npm run dev
```

Sign in with Discord. If your Discord user ID is `1438172505423478916`, you are the owner and can open `/admin`.

## How login works

The site uses Discord **implicit OAuth** (`identify` only). No client secret is stored in the project.

## Data

Profiles and projects are stored in this browser (localStorage).
That means the site works without a database account. Other people on other computers will not automatically see the same listings unless they use the same browser profile.

## Live site from this repo

Push to `main`. The GitHub Action builds the app to GitHub Pages:

https://popcornparty.github.io/ProjectHub/
