import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { LinearGradient } from "@/components/ui/LinearGradient";
import { VStack } from "@/components/ui/vstack";
import { useApi } from "@/hooks/useApi";
import { NewTrip } from "@/utils/model";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { SafeAreaView, ScrollView, Switch, Text } from "react-native";

export default function QuestionnaireScreen() {
  const api = useApi();
  // Date/time variables
  const [tripStart, setTripStart] = useState(new Date());
  // State variables for user inputs
  const [tripName, setTripName] = useState("");
  const [tripClimate, setTripClimate] = useState("");
  const [length, setLength] = useState("");
  const [purpose, setPurpose] = useState("");
  const [allInclusive, setAllInclusive] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate;
    if (currentDate) {
      setTripStart(currentDate);
    }
  };

  const handleSubmit = async () => {
    // send to creation page
    const trip = await api.trips.create({
      length: parseInt(length, 10),
      name: tripName,
      region: tripClimate,
      purpose: purpose,
      all_inclusive: allInclusive,
      start_date: tripStart,
    } as NewTrip);
    router.push({
      pathname: "./trip",
      params: {
        uuid: trip.trip_id,
        showSuggestions: "true",
      },
    });
  };

  const pickerRef = useRef<Picker<string>>(null);

  function open() {
    pickerRef.current?.focus();
  }

  function close() {
    pickerRef.current?.blur();
  }

  return (
    <Box>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <Center className="mt-20">
            <Text className="text-5xl">New Trip</Text>
          </Center>

          <VStack>
            {/* Name */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>Name of Trip</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField placeholder="Name" value={tripName} onChangeText={e => setTripName(e)} />
              </Input>
            </FormControl>
            {/* Climate */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>I'm going somewhere...</FormControlLabelText>
              </FormControlLabel>
              <Box>
                <Picker
                  ref={pickerRef}
                  selectedValue={tripClimate}
                  onValueChange={(itemValue: string, itemIndex: number) => setTripClimate(itemValue)}
                >
                  <Picker.Item label="Sunny / Tropical" value="st" />
                  <Picker.Item label="Sunny / Dry" value="sd" />
                  <Picker.Item label="Outdoors / Wilderness (e.g. camping)" value="ow" />
                  <Picker.Item label="Outdoors / Urban (e.g. a city)" value="ou" />
                  <Picker.Item label="Cold (e.g. Skiing)" value="cd" />
                  <Picker.Item label="Rainy" value="rn" />
                </Picker>
              </Box>
            </FormControl>
            {/* Trip Start Date */}
            <FormControl size="lg" className="mx-32 mt-1">
              <Center>
                <FormControlLabel>
                  <FormControlLabelText>Trip Start Date</FormControlLabelText>
                </FormControlLabel>
                <Box className="mr-5">
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={tripStart}
                    mode={"date"}
                    onChange={onChange}
                    minimumDate={new Date()}
                  />
                </Box>
              </Center>
            </FormControl>

            {/* Length of Stay */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>Length of Stay (in days)</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField
                  keyboardType="number-pad"
                  placeholder="Enter Length of Stay"
                  value={length}
                  onChangeText={e => setLength(e)}
                />
              </Input>
            </FormControl>

            {/* Purpose of Visit */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>Purpose of Visit</FormControlLabelText>
              </FormControlLabel>
              <Input size="lg">
                <InputField placeholder="Enter Purpose of Visit" value={purpose} onChangeText={e => setPurpose(e)} />
              </Input>
            </FormControl>

            {/* All Inclusive */}
            <FormControl size="lg" className="mx-14 mt-7">
              <FormControlLabel>
                <FormControlLabelText>All Inclusive?</FormControlLabelText>
              </FormControlLabel>
              <Switch value={allInclusive} onValueChange={e => setAllInclusive(e)} />
            </FormControl>

            {/* Submit Button */}
            <Center className="m-7 mx-36 mt-10">
              <LinearGradient
                className="w-full rounded-full items-center py-2"
                colors={["#8637CF", "#0F55A1"]}
                start={[0, 1]}
                end={[1, 0]}
              >
                <Text className="text-white font-semibold text-3xl" onPress={handleSubmit}>
                  Create
                </Text>
              </LinearGradient>
            </Center>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}
