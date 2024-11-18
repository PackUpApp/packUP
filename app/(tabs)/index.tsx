import { apiBaseUrl } from "@/constants/Host";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Text } from "react-native";

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
  
      <Box className="bg-white dark:bg-black flex-1">
        <Center>
          <Text>Hi</Text>
        </Center>
      </Box>
  );
}