import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 

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
    <Box flex={1} bg="background" p={4}>
      <ScrollView>
        {/* Trip Information */}
        <Text fontSize={32} fontWeight="bold">
          {trip.title}
        </Text>
        <Text fontSize={18} color="textSubheading">
          {trip.date}
        </Text>
        <Text fontSize={18} color="textSubheading">
          {trip.time}
        </Text>
        <Text fontSize={16} color="textSecondary" mt={2}>
          {trip.description}
        </Text>

        {/* Location */}
        <Box mt={4}>
          <Text fontSize={14} color="textSecondary">
            Location: {trip.location}
          </Text>
        </Box>

        {/* Weather Section */}
        <Box mt={8}>
          <Text fontSize={20} fontWeight="bold">
            Weather
          </Text>
          <Box mt={2}>
            <Text fontSize={16} color="textSecondary">
              Temperature: {trip.weather.temperature}
            </Text>
            <Text fontSize={16} color="textSecondary">
              Forecast: {trip.weather.forecast}
            </Text>
          </Box>
          <Ionicons name="cloudy-outline" size={24} color="#808080" />
        </Box>

        {/* Packing List Section */}
        <Box mt={8}>
          <Text fontSize={20} fontWeight="bold">
            Packing List
          </Text>
          <Box mt={2}>
            <Text fontSize={16} color="textSecondary">
              Here's a suggested packing list for your trip:
            </Text>
            <Box mt={4}>
              {trip.packingList.map((item, index) => (
                <Text key={index} fontSize={16} color="textSecondary">
                  - {item}
                </Text>
              ))}
            </Box>
          </Box>
        </Box>

      </ScrollView>
    </Box>
  );
}
