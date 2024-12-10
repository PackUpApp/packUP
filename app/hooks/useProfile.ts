import { Session, User } from "@/utils/model";
import { atom, useAtom } from "jotai";
import { createClient } from "./useApi";

async function initializeProfile(set: (update: User | null) => void, session: Session | null) {
  if (!session) {
    set(null);
    return;
  }

  const api = createClient(session);
  const user = await api.user.profile.get();

  set(user);
}

export const profileAtom = atom<User | null>(null);

export function useProfile() {
  const [profile, setProfile] = useAtom(profileAtom);

  return {
    profile,
    setProfile,
    initializeProfile: (session: Session | null) => initializeProfile(setProfile, session),
  };
}
