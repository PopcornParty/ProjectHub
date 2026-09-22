# ProjectHub

**Find people. Build projects.**

ProjectHub helps people find teammates for Minecraft servers, Discord bots, websites, games, YouTube channels and other creative or technical projects. Accounts use Discord. There is no in-app inbox — people contact each other on Discord.

This app is built to run on **free tiers**:

- Frontend: React + TypeScript + Vite + Tailwind
- Database + auth: [Supabase](https://supabase.com) (free project)
- Hosting: [Vercel](https://vercel.com) or Cloudflare Pages

## 1. Create free accounts

1. A [GitHub](https://github.com) account
2. A [Supabase](https://supabase.com) account
3. A [Discord](https://discord.com/developers/applications) developer application
4. A [Vercel](https://vercel.com) account (recommended hosting)

## 2. Create the database

1. In Supabase, click **New project**.
2. Open **SQL Editor**.
3. Paste and run `supabase/schema.sql`.
4. Paste and run `supabase/seed.sql`.

## 3. Configure Discord OAuth

1. Open [Discord Developer Portal](https://discord.com/developers/applications) → New Application → **OAuth2**.
2. Copy the **Client ID** and **Client Secret**.
3. In Supabase go to **Authentication → Providers → Discord**.
4. Enable Discord.
5. Paste the Client ID and Client Secret.
6. Add these redirect URLs in **both** Discord and Supabase:

Local:

```
http://localhost:5173/auth/callback
```

Production (replace with your Vercel domain):

```
https://YOUR-DOMAIN.vercel.app/auth/callback
```

Supabase also shows its own callback URL (`https://YOUR_PROJECT.supabase.co/auth/v1/callback`). Add that exact URL to the Discord application redirect list.

Scopes used: `identify` only.

## 4. Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_SITE_URL=http://localhost:5173
```

Get the URL and anon key from Supabase **Project Settings → API**.

Never put the Supabase **service role** key in this frontend. Never commit `.env.local`.

## 5. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 6. Deploy (Vercel, free)

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Add environment variables:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_SITE_URL=https://YOUR-DOMAIN.vercel.app
```

4. Deploy.
5. Add the production `/auth/callback` URL to Discord and Supabase as in step 3.

Cloudflare Pages also works: build command `npm run build`, output directory `dist`, same env vars.

## 7. Set the owner account

Your Discord user ID is a snowflake (Developer Mode → right click your Discord profile → Copy User ID).

In the Supabase SQL editor run:

```sql
insert into public.platform_config (key, value)
values ('owner_discord_id', 'YOUR_DISCORD_USER_ID')
on conflict (key) do update set value = excluded.value, updated_at = now();
```

Then sign in to ProjectHub with that Discord account. A database trigger assigns the `owner` role. The frontend cannot spoof this.

If you already signed in once, sign out and back in, or run:

```sql
update public.profiles
set role = 'owner'
where discord_id = 'YOUR_DISCORD_USER_ID';
```

## 8. Production OAuth redirect

After the first deploy, confirm Discord OAuth2 redirects include:

- `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
- `https://YOUR-DOMAIN.vercel.app/auth/callback`

## Safety

ProjectHub is designed for younger builders:

- No internal DMs
- Age ranges instead of birthdays
- Block + report
- Basic filters against emails / phone numbers in text fields
- Public profiles never show emails

## Project layout

```
src/components    reusable UI
src/pages         routes
src/layouts       shell
src/lib           supabase, matching, validation
src/services      data access
src/context       auth + toasts
supabase/         schema + catalog seed
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```
