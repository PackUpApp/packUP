import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Device from "expo-device";
import { StyleSheet } from "react-native";
import { version } from "../../package.json";
import useProfile from "../hooks/useProfile";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const { profile } = useProfile();

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
          {profile ? `Welcome back ${profile.fname} ${profile.lname}!\nEmail: ${profile.email}` : "Loading…"}
        </ThemedText>
      </Collapsible>
      <Collapsible title="Appearance">
        <ThemedText>
          Current theme is:
          <ThemedText type="defaultSemiBold">
            {" "}
            {colorScheme} {"\n"}
          </ThemedText>
          You can change this via your phone's settings.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Privacy">
        <ThemedText>Privacy policy coming soon.</ThemedText>
      </Collapsible>
      <Collapsible title="Cache">
        <ThemedText>packUP does not do caching (screw Redis).</ThemedText>
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
