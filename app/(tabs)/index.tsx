import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { apiBaseUrl } from "@/constants/Host";
import { Session, User } from "@/utils/model";
import { loginWithGoogle } from "@/utils/oauth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const [skipFetch, setSkipFetch] = useState(false);
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getItemAsync("session").then(value => {
      if (!value) return;
      const session = Session.safeParse(JSON.parse(value));
      if (!session.success) return console.error(session.error);
      if (session.data.expires.getTime() < Date.now()) return;
      setSession(session.data);
    });
  }, []);

  const {
    isPending,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    async queryFn() {
      if (skipFetch && loginUser) {
        setSkipFetch(false);
        return loginUser;
      }

      const res = await fetch(`${apiBaseUrl}/user/profile`, {
        headers: new Headers({
          Authorization: session!.token,
        }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const user = (await res.json()) as User;
      return user;
    },
    enabled: !!session,
  });

  const queryClient = useQueryClient();

  const handleSignIn = async () => {
    try {
      setSkipFetch(true);
      const result = await loginWithGoogle();
      setLoginUser(result.user);
      await setItemAsync("session", JSON.stringify(result.session));
      setSession(result.session);
    } catch (e: unknown) {
      console.error("Failed to sign in with Google", e);
    }
  };

  const logout = () => {
    deleteItemAsync("session").then(() => {
      setSession(null);
      setLoginUser(null);
    });
  };

  // Use useEffect to respond to state changes
  useEffect(() => {
    if (session === null && loginUser === null) {
      queryClient.removeQueries({
        exact: true,
        queryKey: ["user"],
      });
      setSession(null);
    }
  }, [session, loginUser, queryClient]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">packUP!</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          {isPending ? "Loading…" : error ? "An error occurred" : `Welcome back ${user.fname} ${user.lname}!`}
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.button}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create New Trip</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.button}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.button}>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  button: {
    padding: 15,
    backgroundColor: "#add8e6",
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
  },
});
