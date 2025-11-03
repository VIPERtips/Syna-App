
import { useUser } from "@clerk/clerk-expo";
import { View,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {
  const { user } = useUser();
  const loading = true;

  const handleSignOut = () => {};
  
  
  const displayName =
    user?.firstName ||
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "User";

  const capitalizedDisplayName =
    displayName.charAt(0).toUpperCase() + displayName.slice(1);

  return (
    <SafeAreaView className="bg-general-500 flex-1">
     <View>
      <Text>
        Welcome to Home
      </Text>
     </View>
    </SafeAreaView>
  );
}
