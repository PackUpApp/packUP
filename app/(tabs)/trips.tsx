import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, Text } from "react-native";

export default function TabTwoScreen() {
  function tripClick() {
    router.navigate("../trippage");
  }

  function getTrips() {
    const totallyRealTripName = "12/25/24";
    const totallyRealItemCount = 21;
    return (
      <Card className="">
        <Heading>{totallyRealTripName}</Heading>
        <Text>{totallyRealItemCount}</Text>
      </Card>
    );
  }

  return (
    <SafeAreaView>
      <Box>
        <ScrollView>
          <Center>
            <Text className="text-7xl mt-5">Your Trips</Text>
            <Box>
              <VStack>{getTrips()}</VStack>
            </Box>
          </Center>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
