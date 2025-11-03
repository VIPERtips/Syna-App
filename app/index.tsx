import { useAuth } from "@clerk/clerk-expo"
import { Redirect } from "expo-router"
import { ActivityIndicator, Image, Text, View } from "react-native"

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F9FAFB]">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-24 h-24 mb-4"
        />
        <Text className="text-2xl font-bold text-[#0e58f8] tracking-wide font-Jakarta">
          APP NAME
        </Text>
        <Text className="text-gray-500 mb-6 font-JakartaMedium">We hate buses too.</Text>
        <ActivityIndicator size="large" color="red" />
      </View>
    )
  }

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />
  }

  return <Redirect href="/(auth)/welcome" />
}
