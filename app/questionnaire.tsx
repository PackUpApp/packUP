import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { SafeAreaView, StyleSheet, Text, Switch, Button, ScrollView } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";

export default function QuestionnaireScreen() {
  // State variables for user inputs
  const [geoRegion, setGeoRegion] = useState("");
  const [length, setLength] = useState("");
  const [purpose, setPurpose] = useState("");
  const [allInclusive, setAllInclusive] = useState(false);
  const [airport, setAirport] = useState("");
  const [flightTime, setFlightTime] = useState("");

  const handleSubmit = () => {
    // send to API
    console.log({
      geoRegion,
      length,
      purpose,
      allInclusive,
      airport,
      flightTime,
    });
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

            {/* Nearest Airport */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>Nearest Airport</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField
                  placeholder="Enter Nearest Airport"
                  value={airport}
                  onChangeText={(e) => setAirport(e)}
                />
              </Input>
            </FormControl>

            {/* Flight Time */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>Flight Time (in hours)</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField
                  placeholder="Enter Flight Time"
                  value={flightTime}
                  onChangeText={(e) => setFlightTime(e)}
                />
              </Input>
            </FormControl>

            {/* Submit Button */}
            <Center className="mt-7 mb-10">
              <Button title="Submit" onPress={handleSubmit} />
            </Center>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}
