import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Button, Text,TouchableOpacity,Pressable } from "react-native";

export default function HomeScreen() {
  const { isPending, error, data } = useQuery({
    queryKey: ["sync"],
    async queryFn() {
      const res = await fetch("http://localhost:8083/user/b879bc2a-8817-47e6-ab12-4ad86785223e", {
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
    <ParallaxScrollView
      headerBackgroundColor={{light: "black",  dark: "white" }}
      headerImage={<Image source={require("@/assets/images/PackUp-Logo.png")} style={styles.reactLogo} />}

    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Start New Trip</ThemedText>
      </ThemedView>


      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          {isPending ? "Loading…" : error ? "An error occurred" : `Welcome back ${data.fname} ${data.lname}!`}
        </ThemedText>
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
    left: 50,
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