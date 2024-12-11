import { apiBaseUrl } from "@/constants/Host";
import { useQuery } from "@tanstack/react-query";
import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Button, ButtonText, } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
import { SafeAreaView } from "react-native";
import { router } from "expo-router";


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

  function newTripClick(){
    router.navigate("./questionnaire");
  }

  return (
        <Box className="bg-white dark:bg-black flex-1">
          <SafeAreaView>
            <Center className="">
              <Image size="2xl" className="mt-6" alt="packUP Logo" source={require('@/assets/images/PackUp-Logo.png')}/>
            </Center>
            <Center className="">
              <Button size="xl" className="mt-80 h-20" onPress={newTripClick}>
                <ButtonText className="text-4xl">
                  Create New Trip
                </ButtonText>
              </Button>
            </Center>
          </SafeAreaView>
        </Box>
  );


}
