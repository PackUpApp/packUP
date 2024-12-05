import { Box } from "@/components/ui/box"; 
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Pressable } from "@/components/ui/pressable";
import { Ionicons } from "@expo/vector-icons"; 
import { ScrollView } from "react-native"; 
import { router } from "expo-router";

export default function TabTwoScreen() {
  function tripClick(){
    router.navigate("../trippage");
  }
  return (
    <Box flex={1} bg="background">
      <Box p={4} mb={8}>
        <Text fontSize={24} fontWeight="bold">Planned Trips</Text>
      </Box>

      {/* Trip Cards Section */}
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Trip 1 */}
        <Pressable onPress={() => tripClick()}>
          <Card borderRadius={12} overflow="hidden" mb={4} p={4} bg="cardBackground">
            <Box flexDirection="row" alignItems="center" justifyContent="space-between">
              <Box flex={1}>
                <Text fontSize={16} fontWeight="bold">Trip to Paris</Text>
                <Text fontSize={14} color="textSubheading">January 2025</Text>
                <Text fontSize={12} color="textSecondary">Eiffel Tower & Museums</Text>
              </Box>
              <Ionicons name="location-outline" size={24} color="#808080" />
            </Box>

            <Box mt={2}>
              <Text fontSize={12} color="textSecondary">
                Pasta Baguette.
              </Text>
            </Box>

          </Card>
        </Pressable>

        {/* Trip 2 */}
        <Pressable onPress={() => tripClick()}>
          <Card borderRadius={12} overflow="hidden" mb={4} p={4} bg="cardBackground">
            <Box flexDirection="row" alignItems="center" justifyContent="space-between">
              <Box flex={1}>
                <Text fontSize={16} fontWeight="bold">Safari in Kenya</Text>
                <Text fontSize={14} color="textSubheading">March 2025</Text>
                <Text fontSize={12} color="textSecondary">Beaches & National Parks</Text>
              </Box>
              <Ionicons name="location-outline" size={24} color="#808080" />
            </Box>

            <Box mt={2}>
              <Text fontSize={12} color="textSecondary">
                Go see Simba.
              </Text>
            </Box>


          </Card>
        </Pressable>
      </ScrollView>
    </Box>
  );
}
