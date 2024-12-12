import { Box } from "@/components/ui/box";
import { Center } from "@/components/ui/center";
import { Image } from "@/components/ui/image";
import { LinearGradient } from "@/components/ui/LinearGradient";
import { Text } from "@/components/ui/text";
import { useProfile } from "@/hooks/useProfile";
import { useSession } from "@/hooks/useSession";
import { loginWithGoogle } from "@/utils/oauth";
import { router } from "expo-router";
import { deleteItemAsync, setItemAsync } from "expo-secure-store";
import { GestureResponderEvent, SafeAreaView } from "react-native";

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

  function coolAssButton(label: string, callback: (event: GestureResponderEvent) => void) {
    return (
      <LinearGradient
        className="w-full rounded-full items-center py-2"
        colors={["#0F55A1", "#8637CF"]}
        start={[0, 1]}
        end={[1, 0]}
      >
        <Text className="text-white font-semibold text-3xl" onPress={callback}>
          {label}
        </Text>
      </LinearGradient>
    );
  }

  return (
    <Box className="bg-white dark:bg-black flex-1">
      <SafeAreaView>
        <Center className="">
          <Image size="2xl" className="mt-6" alt="packUP Logo" source={require("@/assets/images/PackUp-Logo.png")} />
        </Center>
        <Center className="mx-36 gap-2">
          {coolAssButton("New Trip", newTripClick)}
          {profile ? coolAssButton("Log Out", logout) : coolAssButton("Sign In", handleSignIn)}
        </Center>
      </SafeAreaView>
    </Box>
  );
}
