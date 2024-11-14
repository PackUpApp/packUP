import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { apiBaseUrl } from "@/constants/Host";
import { useQuery } from "@tanstack/react-query";
import { Image, StyleSheet, SafeAreaView } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  const { isPending, error, data } = useQuery({
    queryKey: ["sync"],
    async queryFn() {
      const res = await fetch(`${apiBaseUrl}/user/b879bc2a-8817-47e6-ab12-4ad86785223e`, {
        headers: new Headers({
          Authorization: "Bearer 123",
        }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const text = await res.json();
      return text;
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <Image source={require("@/assets/images/PackUp-Logo.png")} style={styles.headerImage} />
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Start New Trip</ThemedText>
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            {isPending ? "Loading…" : error ? "An error occurred" : `Welcome back ${data.fname} ${data.lname}!`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.button}>
          <Link href="./questionnaire" style={styles.buttonText}>
            {" "}
            Create New Trip{" "}
          </Link>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "clear",
    bottom: -250,
  },
  safeArea: {
    
  },

  Container: {
    flex: 1,
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: -30,
    left: 50,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    
  },

  headerImage: {
    width: "100%",
    height: 200,
    marginBottom: -200,
  },

  button: {
    bottom: -500,
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
