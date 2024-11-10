import { apiBaseUrl } from "@/constants/Host";
import { openAuthSessionAsync } from "expo-web-browser";
import { Session, User } from "./model";

function createState() {
  return Math.random().toString(36).substring(2);
}

async function login(options: LoginOptions) {
  const result = await openAuthSessionAsync(urls[options.provider](options.state));

  if (result.type !== "success") throw new Error(result.type);
  const params = new URL(result.url).searchParams;

  if (params.get("state") !== options.state) {
    console.error("Please sign in through the packUP app.");
    throw new Error("Please sign in through the packUP app.");
  }

  const code = params.get("code");

  const res = await fetch(`${apiBaseUrl}/auth/${options.provider}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    console.error("Failed to exchange auth code for tokens", res.statusText);
    throw new Error(res.statusText);
  }

  const user = await res.json();

  return user as { user: User; session: Session };
}

export async function loginWithGoogle() {
  const state = createState();
  return login({
    state,
    provider: "google",
  });
}

export type LoginOptions = {
  state: string;
  provider: keyof typeof urls;
};

export type ProviderURL = (state: string) => string;

export const urls = {
  apple(state: string) {
    // TODO Apple URL
    return "";
  },
  google(state: string) {
    return `https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&state=${state}&scope=openid%20email%20profile&response_type=code&client_id=237029104535-geupqsqu09hr929gnce7hochoutqjm0l.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8083%2Fauth%2Fgoogle&prompt=select_account`;
  },
} satisfies Record<string, ProviderURL>;
