import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { beginDiscordLogin, captureDiscordTokenFromHash, clearToken, discordAvatarUrl, fetchDiscordMe, getStoredToken } from "@/lib/discord";
import { upsertProfileFromDiscord } from "@/lib/db";
import type { Profile } from "@/types";
import { fetchProfileById } from "@/services/profiles";

type AuthState = {
  session: { access: string } | null;
  user: { id: string } | null;
  profile: Profile | null;
  loading: boolean;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = async () => {
    captureDiscordTokenFromHash();
    const stored = getStoredToken();
    setToken(stored);
    if (!stored) {
      setProfile(null);
      setLoading(false);
      return;
    }
    const me = await fetchDiscordMe(stored);
    if (!me) {
      setProfile(null);
      setLoading(false);
      return;
    }
    const saved = upsertProfileFromDiscord({
      ...me,
      avatarUrl: discordAvatarUrl(me.id, me.avatar),
    });
    setProfile(fetchProfileById(saved.id) || saved);
    setLoading(false);
  };

  useEffect(() => {
    hydrate();
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      session: token ? { access: token } : null,
      user: profile ? { id: profile.id } : null,
      profile,
      loading,
      signInWithDiscord: async () => {
        beginDiscordLogin();
      },
      signOut: async () => {
        clearToken();
        setToken(null);
        setProfile(null);
      },
      refreshProfile: async () => {
        if (profile) setProfile(fetchProfileById(profile.id));
      },
    }),
    [token, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
