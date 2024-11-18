import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { apiBaseUrl } from "@/constants/Host";
import { useQuery } from "@tanstack/react-query";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  const { isPending, error, data } = useQuery({
    queryKey: ["sync"],
    async queryFn() {
      const res = await fetch(`${apiBaseUrl}/user/b879bc2a-8817-47e6-ab12-4ad86785223e`, {
        headers: new Headers({
          Authorization: "Bearer 123",
        }),
      });

      if (!res.ok) throw new Error(res.statusText);

      const text = await res.json();
      return text;
    },
  });

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

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textInputContainer: {

  },
  textInput: {
    
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },

  button: {
    padding: 15,
    backgroundColor: "#add8e6",
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
  },
});
