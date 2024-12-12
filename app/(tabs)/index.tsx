import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Image } from "@/components/ui/image";
import { loginWithGoogle } from "@/utils/oauth";
import { router } from "expo-router";
import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { SafeAreaView } from "react-native";
import useProfile from "../hooks/useProfile";
import useSession from "../hooks/useSession";

export default function HomeScreen() {
  const { profile, setProfile } = useProfile();
  const { setSession } = useSession();

  const handleSignIn = async () => {
    try {
      const result = await loginWithGoogle();
      await setItemAsync("session", JSON.stringify(result.session));
      setSession(result.session);
      setProfile(result.user);
    } catch (e: unknown) {
      console.error("Failed to sign in with Google", e);
    }
  };

  const logout = async () => {
    await deleteItemAsync("session");
    setSession(null);
    setProfile(null);
  };

  function newTripClick() {
    router.navigate("./questionnaire");
  }

  return (
    <Box className="bg-white dark:bg-black flex-1">
      <SafeAreaView>
        <Center className="">
          <Image size="2xl" className="mt-6" alt="packUP Logo" source={require("@/assets/images/PackUp-Logo.png")} />
        </Center>
        <Center className="">
          <Button size="xl" className="mt-80 h-20" onPress={newTripClick}>
            <ButtonText className="text-4xl">Create New Trip</ButtonText>
          </Button>
          <Button size="xl" className="mt-80 h-20" onPress={handleSignIn}>
            <ButtonText className="text-4xl">Sign in with Google</ButtonText>
          </Button>
          <Button size="xl" className="mt-80 h-20" onPress={logout}>
            <ButtonText className="text-4xl">Log out</ButtonText>
          </Button>
        </Center>
      </SafeAreaView>
    </Box>
  );
}
