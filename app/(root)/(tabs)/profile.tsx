import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center p-6">
            <Image
                source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                className="w-24 h-24 rounded-full mb-6"
            />
            <Text className="text-blue-500 text-2xl font-bold">Blessed Tadiwa</Text>
            <Text className="text-neutral-600 text-base mt-2">Frequent Rider</Text>

            <View className="mt-8 bg-blue-100 p-4 rounded-2xl w-64 items-center">
                <Text className="text-blue-600 font-medium">Trips Taken: 42</Text>
                <Text className="text-blue-600 font-medium mt-1">Wallet Balance: $18.60</Text>
            </View>
        </SafeAreaView>
    )
}
