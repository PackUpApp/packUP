import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet } from "react-native";
import { Platform } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useQuery } from "@tanstack/react-query";
import * as Device from "expo-device";
import { version } from "../../package.json";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabTwoScreen() {
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

  const colorScheme = useColorScheme();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Ionicons size={310} name="settings" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      <Collapsible title="Account">
        <ThemedText>
          {isPending
            ? "Loading…"
            : error
              ? "An error occurred"
              : `Welcome back ${data.fname} ${data.lname}!\nEmail: ${data.email}`}
        </ThemedText>
      </Collapsible>
      <Collapsible title="Appearance">
        <ThemedText>
          Your current theme is {colorScheme}. {"\n"}
          You can change this via your phone's settings.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Privacy">
        <ThemedText>
          Privacy policy coming soon.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Cache">
        <ThemedText>
          packUP does not do caching (screw Redis).
        </ThemedText>
      </Collapsible>
      <Collapsible title="About">
        <ThemedText>
          Running on {Device.manufacturer} {Device.modelName} {"\n"}
          packUP version {version}
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
