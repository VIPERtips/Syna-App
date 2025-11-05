import { useAuth } from "@clerk/clerk-expo"
import { Redirect } from "expo-router"
import { ActivityIndicator, Image, Text, View } from "react-native"

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-pali-background">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-24 h-24 mb-4"
        />
        <Text className="text-2xl font-bold text-pali-primary tracking-wie">
          Syna
        </Text>
        <Text className="text-gray-500 mb-6 font-JakartaMedium">Linked. Synced. Sorted.</Text>
        <ActivityIndicator size="large" color="teal" />
      </View>
    )
  }

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />
  }

  return <Redirect href="/(auth)/welcome" />
}
