import { useUser, useAuth } from "@clerk/clerk-expo";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {router} from "expo-router";

export default function Home() {
  const { user } = useUser();
  const { signOut } = useAuth(); 
  const loading = false;

  const handleSignOut = async () => {
    try {
      await signOut();
      
      router.push("/(auth)/sign-in");
    } catch (err) {
      console.log("Sign out failed:", err);
    }
  };

  const displayName =
    user?.firstName ||
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "User";

  const capitalizedDisplayName =
    displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <SafeAreaView className="bg-pali-accent flex-1 p-5">
      <View className="mb-6">
        <Text className="text-white text-lg">
          Welcome, {capitalizedDisplayName}!
        </Text>
        <Text className="text-white text-sm">
          {user?.emailAddresses[0].emailAddress}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleSignOut}
        className="bg-red-500 py-3 px-5 rounded-xl"
      >
        <Text className="text-white text-center font-JakartaSemiBold">
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
