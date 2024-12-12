import { Session } from "@/utils/model";
import { getItemAsync } from "expo-secure-store";
import { atom, useAtom } from "jotai";

async function initializeSession(set: (update: Session | null) => void) {
  const value = await getItemAsync("session");
  if (!value) {
    set(null);
    return null;
  }

  const session = Session.safeParse(JSON.parse(value));
  if (!session.success) {
    console.error(session.error);
    set(null);
    return null;
  }

  if (session.data.expires.getTime() < Date.now()) {
    set(null);
    return null;
  }

  set(session.data);
  return session.data;
}

export const sessionAtom = atom<Session | null>(null);

export default function useSession() {
  const [session, setSession] = useAtom(sessionAtom);

  return { session, setSession, initializeSession: () => initializeSession(setSession) };
}
