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
        <ThemedText type="title">Start New Trip</ThemedText>
      </ThemedView>






      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{isLoading ? "Have fun on your trip!" : response}</ThemedText>
        <HelloWave />
      </ThemedView>

      


      <ThemedView style={styles.button}>
      <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Create New Trip</Text>
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