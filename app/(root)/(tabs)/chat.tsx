/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from "react-native-reanimated";

export default function ChatComingSoon() {
  const scale = useSharedValue(0);
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 8, stiffness: 120 });
    translateY.value = withSpring(0, { damping: 8, stiffness: 120 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 bg-teal-600 justify-center items-center">
      <Animated.View
        style={animatedStyle}
        className="p-6 bg-white rounded-3xl shadow-lg w-11/12"
      >
        <Text className="text-4xl font-extrabold text-teal-700 text-center mb-4">
          Chat Coming Soon
        </Text>
        <Text className="text-center text-gray-600 text-base mb-4">
          We're building a smarter way to connect patients and doctors.
        </Text>
        <Text className="text-center text-gray-400 text-sm">
          In the meantime, explore other features in Syna.
        </Text>
      </Animated.View>
    </View>
  );
}
