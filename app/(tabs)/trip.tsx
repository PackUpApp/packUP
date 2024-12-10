import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripDetailsScreen() {
  // Hardcoded Trip Data
  const trip = {
    title: "Trip to anywhere",
    date: "sometime in 2025",
    time: "10:00:00 A.M.",
    location: "Awesomeland",
    description:
      "We went to narnia",
    packingList: [
      "Passport",
      "Camera",
      "Sunscreen",
      "Comfortable shoes",
      "Power bank",
      "Adapter",
      "Clothes for warm and cool weather",
    ],
    weather: {
      temperature: "18°C",
      forecast: "cloudy with a chance of meatballs",
    },
  };

  return (
    <SafeAreaView>
      <Box className="flex-1 p-4">
        <ScrollView>
          <Text>WIP.</Text>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
