import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Button, Text,TouchableOpacity,Pressable } from "react-native";

export default function HomeScreen() {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    await new Promise(res => setTimeout(res, 5000));
    const res = await fetch("http://localhost:8083/api/sync");
    const text = await res.text();
    setResponse(text);
    setIsLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.reactLogo} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">packUP!</ThemedText>
      </ThemedView>






      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{isLoading ? "Loading…" : response}</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">{Platform.select({ ios: "cmd + d", android: "cmd + m" })}</ThemedText> to
          open developer tools.
        </ThemedText>
      </ThemedView>


      <ThemedView style={styles.button}>
      <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Create New Trip</Text>
      </TouchableOpacity>
   



      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>Tap the Explore tab to learn more about what's included in this starter app.</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
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
    backgroundColor: '#add8e6',
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
   
  }

  
});