import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { apiBaseUrl } from "@/constants/Host";
import { useQuery } from "@tanstack/react-query";
import { Image, StyleSheet, Text, TouchableOpacity, SafeAreaView } from "react-native";

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
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Start New Trip</ThemedText>
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Have fun on your trip!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.button}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Create New Trip</Text>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    bottom: -250,
  },

  safeArea: {},

  Container: {
    flex: 1,
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 50,
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
