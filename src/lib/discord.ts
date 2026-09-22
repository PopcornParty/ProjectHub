import { DISCORD_CLIENT_ID } from "@/lib/config";

const TOKEN_KEY = "ph_discord_token";

export function redirectUri() {
  return `${window.location.origin}${import.meta.env.BASE_URL}auth/callback`.replace(/([^:]\/)\/+/g, "$1");
}

export function beginDiscordLogin() {
  if (!DISCORD_CLIENT_ID || DISCORD_CLIENT_ID.startsWith("PASTE_")) {
    throw new Error("Add your Discord application ID in src/lib/config.ts first.");
  }
  const state = crypto.randomUUID();
  sessionStorage.setItem("ph_oauth_state", state);
  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: redirectUri(),
    response_type: "token",
    scope: "identify",
    state,
    prompt: "consent",
  });
  window.location.href = `https://discord.com/oauth2/authorize?${params.toString()}`;
}

export function captureDiscordTokenFromHash() {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const token = hash.get("access_token");
  const type = hash.get("token_type") || "Bearer";
  const state = hash.get("state");
  const expected = sessionStorage.getItem("ph_oauth_state");
  if (!token) return null;
  if (expected && state && expected !== state) return null;
  const packed = `${type} ${token}`;
  localStorage.setItem(TOKEN_KEY, packed);
  window.history.replaceState({}, "", window.location.pathname + window.location.search);
  return packed;
}

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function fetchDiscordMe(authHeader?: string) {
  const header = authHeader || getStoredToken();
  if (!header) return null;
  const res = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: header },
  });
  if (!res.ok) {
    clearToken();
    return null;
  }
  return (await res.json()) as {
    id: string;
    username: string;
    global_name?: string | null;
    avatar?: string | null;
  };
}

export function discordAvatarUrl(id: string, avatar?: string | null) {
  if (!avatar) return `https://cdn.discordapp.com/embed/avatars/${Number(id) % 5}.png`;
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
}
