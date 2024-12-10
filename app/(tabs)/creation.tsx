import { LinearGradient } from "expo-linear-gradient";
import { Center } from "@/components/ui/center";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function TripCreation() {
  const params = useLocalSearchParams();
  console.log(params);
  const { tripStart, length, geoRegion, purpose, allInclusive: isInclusive } = params;
  let allInclusive = isInclusive == "true";
  // push to DB
  // window.push({pathname: "./trips"});
  return (
    <>
      <LinearGradient colors={["#8637CF", "#0F55A1"]} className="h-screen">
        <Center>
          <Text className="font-bold text-7xl p-3 pt-80 pl-8 text-white justify-center place-self-center">
              Creating your trip...
          </Text>
        </Center>
      </LinearGradient>
    </>
  );
}