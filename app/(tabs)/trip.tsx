//checkbox packing list
import { Box } from "@/components/ui/box";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel, CheckIcon } from "@/components/ui/checkbox";
import { useState } from "react";

export default function PackingListScreen() {
  // State for multiple items in the packing list
  const [checkedItems, setCheckedItems] = useState({
    passport: false,
    sunscreen: false,
    charger: false,
    clothes: false,
    snacks: false,
  });

  // Handle checkbox change for each item
  const handleCheckboxChange = (item: string) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item], // Toggle the checked state
    }));
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Box p={4}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Packing List</Text>
          
          <Box mt={4}>
            <Checkbox
              size="md"
              isChecked={checkedItems.passport}
              onChange={() => handleCheckboxChange('passport')}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Passport</CheckboxLabel>
            </Checkbox>
          </Box>

          <Box mt={2}>
            <Checkbox
              size="md"
              isChecked={checkedItems.sunscreen}
              onChange={() => handleCheckboxChange('sunscreen')}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Sunscreen</CheckboxLabel>
            </Checkbox>
          </Box>

          <Box mt={2}>
            <Checkbox
              size="md"
              isChecked={checkedItems.charger}
              onChange={() => handleCheckboxChange('charger')}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Charger</CheckboxLabel>
            </Checkbox>
          </Box>

          <Box mt={2}>
            <Checkbox
              size="md"
              isChecked={checkedItems.clothes}
              onChange={() => handleCheckboxChange('clothes')}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Clothes</CheckboxLabel>
            </Checkbox>
          </Box>

          <Box mt={2}>
            <Checkbox
              size="md"
              isChecked={checkedItems.snacks}
              onChange={() => handleCheckboxChange('snacks')}
            >
              <CheckboxIndicator>
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel>Snacks</CheckboxLabel>
            </Checkbox>
          </Box>

        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

/* 
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
*/