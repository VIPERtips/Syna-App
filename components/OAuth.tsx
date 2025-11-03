import { icons } from "@/constants"
import { Image, StyleSheet, Text, View } from "react-native"
import CustomButton from "./CustomButton"

export default function OAuth() {
  const handleGoogleSignIn = () => {
    // Handle Google Sign-In logic here
    console.log("Google Sign-In Pressed")
  }

  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-center space-x-3 gap-x-3 mb-6">
        <View style={styles.line} />
        <Text className="text-gray-500 font-JakartaMedium text-[15px]">Or</Text>
        <View style={styles.line} />
      </View>
      <CustomButton
      title="Continue with Google"
      className="mt-5 w-full shadow-none"
      bgVariant="outline"
      iconLeft={
        <Image
          source={icons.google}
          className="w-5 h-5 mx-2"
          resizeMode="contain"
        />
      }
      textVariant="dark"
      onPress={handleGoogleSignIn}
       />
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#d1d5db" 
  }
})
