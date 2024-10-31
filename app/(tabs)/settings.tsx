import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, StyleSheet } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useQuery } from "@tanstack/react-query";

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
          You can open this project on Android, iOS, and the web. To open the web version, press{" "}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Privacy">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{" "}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for different screen densities
        </ThemedText>
        <Image source={require("@/assets/images/react-logo.png")} style={{ alignSelf: "center" }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Cache">
        <ThemedText>
          Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{" "}
          <ThemedText style={{ fontFamily: "SpaceMono" }}>custom fonts such as this one.</ThemedText>
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      {/* <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{" "}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses the powerful{" "}
          <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library to create a waving hand
          animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText> component provides a
              parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible> */}
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
