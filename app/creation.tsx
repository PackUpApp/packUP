import { LinearGradient } from "expo-linear-gradient";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { SafeAreaView} from "react-native";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TripCreation() {
  const { geoRegion, length, purpose, allInclusive: isInclusive } = useLocalSearchParams();
  let allInclusive = isInclusive == "true";
  return (
    <Box>
      <StatusBar hidden={true}/>
      <SafeAreaView>
        <LinearGradient colors={["#8637CF", "#0F55A1"]} className="h-screen">
            <Center>
                <Text className="font-bold text-7xl p-3 pt-64 pl-8 text-white justify-center place-self-center">
                    Creating your trip...
                </Text>
                <Text>
                  {'\n'}
                  You selected: {`\nRegion: ${geoRegion}\nLength ${length}\nPurpose: ${purpose}\nAll Inclusive? ${allInclusive}`}
                </Text>
            </Center>
        </LinearGradient>
      </SafeAreaView>
    </Box>
  );
}
