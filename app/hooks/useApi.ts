import { apiBaseUrl } from "@/constants/Host";
import { Session, User } from "@/utils/model";
import { useSession } from "./useSession";

export function createClient(session: Session | null) {
  const headers = new Headers({
    ...(session && { Authorization: session.token }),
    "Content-Type": "application/json",
  });

  async function baseFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers,
    });
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  }

  return {
    user: {
      profile: {
        async get() {
          return baseFetch<User>("/user/profile");
        },
      },
    },
    trip: {
      async get(tripId: string) {
        return baseFetch(`/trips/${tripId}`);
      },
      items: {
        async get(tripId: string) {
          return baseFetch(`/trips/${tripId}/items`);
        },
      },
    },
  };
}

export function useApi() {
  const { session } = useSession();

  return createClient(session);
}
