import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { SafeAreaView, Text, Switch, Button, ScrollView } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { LinearGradient } from "@/components/ui/LinearGradient";
import { useState } from "react";
import { router } from "expo-router";

export default function QuestionnaireScreen() {
  // State variables for user inputs
  const [geoRegion, setGeoRegion] = useState("");
  const [length, setLength] = useState("");
  const [purpose, setPurpose] = useState("");
  const [allInclusive, setAllInclusive] = useState(false);
  const [airport, setAirport] = useState("");
  const [flightTime, setFlightTime] = useState("");

  const handleSubmit = () => {
    // send to creation page
    router.push({
      pathname: "./creation",
      params: {
        geoRegion,
        length,
        purpose,
        allInclusive: allInclusive ? "true" : "false"
      }
    })
  };

  return (
    <Box>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Center className="mt-20">
            <Text className="text-5xl">New Trip.</Text>
          </Center>
          
          <VStack>
            {/* Geo Region */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>Geo Region</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField
                  placeholder="Enter Geo Region"
                  value={geoRegion}
                  onChangeText={(e) => setGeoRegion(e)}
                />
              </Input>
            </FormControl>

            {/* Length of Stay */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>Length of Stay (in days)</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField
                  placeholder="Enter Length of Stay"
                  value={length}
                  onChangeText={(e) => setLength(e)}
                />
              </Input>
            </FormControl>

            {/* Purpose of Visit */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>Purpose of Visit</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField
                  placeholder="Enter Purpose of Visit"
                  value={purpose}
                  onChangeText={(e) => setPurpose(e)}
                />
              </Input>
            </FormControl>

            {/* All Inclusive */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>All Inclusive?</FormControlLabelText>
              </FormControlLabel>
              <Switch
                value={allInclusive}
                onValueChange={(e) => setAllInclusive(e)}
              />
            </FormControl>

            {/* Submit Button */}
            <Center className="m-7 mx-36 mt-10">
              <LinearGradient
                className="w-full rounded-full items-center py-2"
                colors={["#8637CF", "#0F55A1"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <Text className="text-white font-semibold text-3xl" onPress={handleSubmit}>Create</Text>
              </LinearGradient>
            </Center>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}
