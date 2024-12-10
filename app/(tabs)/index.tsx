import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { loginWithGoogle } from "@/utils/oauth";
import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useProfile } from "../hooks/useProfile";
import { useSession } from "../hooks/useSession";

export default function HomeScreen() {
  const { profile, setProfile } = useProfile();
  const { setSession } = useSession();

  const handleSignIn = async () => {
    try {
      const result = await loginWithGoogle();
      await setItemAsync("session", JSON.stringify(result.session));
      setSession(result.session);
      setProfile(result.user);
    } catch (e: unknown) {
      console.error("Failed to sign in with Google", e);
    }
  };

  const logout = async () => {
    await deleteItemAsync("session");
    setSession(null);
    setProfile(null);
  };

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
          {profile ? `Welcome back ${profile.fname} ${profile.lname}!` : "Not signed in."}
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
