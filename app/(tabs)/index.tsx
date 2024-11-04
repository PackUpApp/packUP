import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Button, Text,TouchableOpacity,Pressable, View, 
  SafeAreaView, 
} from "react-native";

export default function HomeScreen() {
  const { isPending, error, data } = useQuery({
    queryKey: ["sync"],
    async queryFn() {
      const res = await fetch("http://127.0.0.1:7349/user/cfd8c872-f728-4f3b-bb77-e95f49693903", {
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
    <ThemedView
      
      style={styles.container}>
      <Image source={require('@/assets/images/PackUp-Logo.png')} style={styles.headerImage} />
    
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
      <Link href ="./not found" style ={styles.buttonText}> Create New Trip </Link>
      </ThemedView>

      
    </ThemedView>
    </SafeAreaView>


  );
}





const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    bottom: -250
    
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
    
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white',
  },

  headerImage: {
    width: '100%', 
    height: 200, 
    marginBottom: -200, 
  

  },

  

  button: {
    bottom: -500,
    padding: 35,
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