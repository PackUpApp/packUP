import { apiBaseUrl } from "@/constants/Host";
import { Item, ItemUpdate, NewTrip, Session, Trip, User } from "@/utils/model";
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
    trips: {
      async get(tripId: string) {
        return baseFetch<Trip>(`/trips/${tripId}`);
      },
      async list() {
        return baseFetch<Trip[]>(`/trips`);
      },
      async create(trip: NewTrip) {
        return baseFetch<Trip>("/trips", {
          method: "POST",
          body: JSON.stringify(trip),
        });
      },
      items: {
        async update(tripId: string, itemId: string, item: ItemUpdate) {
          return baseFetch<Item>(`/trips/${tripId}/items/${itemId}`, {
            method: "PATCH",
            body: JSON.stringify(item),
          });
        },
        async getAll(tripId: string) {
          return baseFetch<Item[]>(`/trips/${tripId}/items`);
        },
      },
    },
  };
}

export function useApi() {
  const { session } = useSession();

  return createClient(session);
}
