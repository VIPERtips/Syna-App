import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";

export default function QuickActionCard({ item, onPress }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      className="flex-1"
      style={{ 
        minWidth: 100,
        maxWidth: 130,
      }}
    >
      <LinearGradient
        colors={[item.color + "18", item.color + "05"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-[28px] overflow-hidden"
        style={{
          minHeight: 145,
          borderWidth: 1,
          borderColor: item.color + "15",
          shadowColor: item.color,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        {/* Glossy overlay effect */}
        <View 
          className="absolute top-0 left-0 right-0 h-1/2"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
          }}
        />

        {/* Content container */}
        <View className="flex-1 items-center justify-center px-3 py-6">
          {/* Icon container with pulse effect */}
          <View
            className="rounded-[22px] mb-3"
            style={{
              padding: 14,
              backgroundColor: item.color + "25",
              shadowColor: item.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35,
              shadowRadius: 10,
              elevation: 6,
            }}
          >
            <Ionicons name={item.icon} size={32} color={item.color} />
          </View>

          {/* Label */}
          <Text 
            className="text-pali-secondary text-[13px] font-JakartaBold text-center leading-tight"
            numberOfLines={2}
          >
            {item.label}
          </Text>

          {/* Subtitle badge */}
          <View 
            className="mt-2 px-3 py-1 rounded-full"
            style={{
              backgroundColor: item.color + "12",
            }}
          >
            <Text 
              className="text-[10px] font-JakartaSemiBold text-center"
              style={{ color: item.color }}
            >
              {item.id === "book" ? "Schedule" : "Engage"}
            </Text>
          </View>
        </View>

        {/* Decorative corner gradient */}
        <View 
          className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full opacity-20"
          style={{
            backgroundColor: item.color,
          }}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}