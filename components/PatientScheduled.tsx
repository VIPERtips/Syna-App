import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PatientScheduled({ patient }: any) {
  return (
    <View className="space-y-3">
      <TouchableOpacity
        key={patient.id}
        activeOpacity={0.8}
        className="bg-white/8 rounded-3xl p-4 border border-white/10 "
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          marginBottom: 10,
          backgroundColor: "white",
        }}
      >
        <View className="flex-row items-center m-5">
          <Image
            source={{ uri: patient.avatar }}
            style={{ width: 56, height: 56, borderRadius: 28, marginEnd: 5 }}
          />

          <View className="flex-1 ml-4">
            <Text className="text-pali-card-foreground font-JakartaBold text-base">
              {patient.name}
            </Text>
            <Text className="text-gray-400 font-JakartaMedium text-xs mt-1">
              {patient.type}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="time-outline" size={12} color="#00D4AA"
              style={
                {
                  marginEnd: 5
                }
              } />
              <Text className="text-pali-secondary font-JakartaSemiBold text-xs ml-1">
                {patient.time}
              </Text>
            </View>
          </View>

          <TouchableOpacity className="bg-pali-secondary/20 px-4 py-2 rounded-xl">
            <Text className="text-pali-secondary font-JakartaSemiBold text-xs">
              Start
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
