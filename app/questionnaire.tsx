import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { apiBaseUrl } from "@/constants/Host";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function QuestionnaireScreen() {
  // User input storage

  return (
    <Box>
      <SafeAreaView>
        <Center>
          <Text className="text-5xl m-3">
            Let's get started.
          </Text>
        </Center>
      </SafeAreaView>
    </Box>
  );
}