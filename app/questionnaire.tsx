import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";

export default function QuestionnaireScreen() {
  // User input storage
  const [tripLocation, setTripLocation] = useState("");

  return (
    <Box>
      <SafeAreaView>
        <Center className="mt-20">
          <Text className="text-5xl">
            Let's get started.
          </Text>
        </Center>
      <VStack>
        <FormControl size='lg' className="">
          <Input size='lg' className="mx-14 mt-7">
            <InputField 
              placeholder="Enter Text here..." 
              value={tripLocation}
              onChangeText={(e) => setTripLocation(e)}
            />
          </Input>
        </FormControl>
      </VStack>
      </SafeAreaView>
    </Box>
  );
}