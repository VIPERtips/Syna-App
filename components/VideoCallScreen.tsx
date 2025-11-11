import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";

interface VideoCallScreenProps {
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  onClose: () => void;
}
export default function VideoCallScreen({
  doctorName,
  doctorSpecialty,
  doctorImage,
  onClose,
}: any) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState("15:20");

  return (
    <View className="flex-1 bg-gray-900">
      {/* Main Video Area */}
      <View className="flex-1 relative">
        {/* Doctor's Video (Full Screen) */}
        <Image
          source={{ uri: doctorImage }}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Gradient Overlay for readability */}
        <View className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        {/* Back Button */}
        <SafeAreaView className="absolute top-0 left-0 right-0">
          <TouchableOpacity
            onPress={onClose}
            className="ml-4 mt-4 w-10 h-10 bg-gray-800/80 rounded-full items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* User's Video (Picture in Picture) */}
        <View className="absolute top-20 right-4 w-32 h-40 rounded-2xl overflow-hidden bg-gray-800 border-2 border-white shadow-2xl">
          <Image
            source={{ uri: "https://avatar.iran.liara.run/public/56" }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Doctor Info Card */}
        <View className="absolute bottom-32 left-4 right-4">
          <View className="bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 flex-row items-center">
            <Image
              source={{ uri: doctorImage }}
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3 flex-1">
              <Text className="text-white font-JakartaBold text-base">
                {doctorName}
              </Text>
              <Text className="text-gray-300 text-sm font-Jakarta">
                {doctorSpecialty}
              </Text>
            </View>
            <View className="bg-red-500 px-3 py-1 rounded-full flex-row items-center">
              <View className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
              <Text className="text-white text-sm font-JakartaBold">
                {callDuration}
              </Text>
            </View>
          </View>
        </View>

        {/* Control Buttons */}
        <View className="absolute bottom-8 left-0 right-0 px-8">
          <View className="flex-row justify-center items-center space-x-4">
            {/* Mute Button */}
            <TouchableOpacity
              onPress={() => setIsMuted(!isMuted)}
              className={`w-14 h-14 rounded-full items-center justify-center ${
                isMuted ? "bg-white" : "bg-gray-700/80"
              }`}
            >
              <Ionicons
                name={isMuted ? "mic-off" : "mic"}
                size={24}
                color={isMuted ? "#000" : "#FFF"}
              />
            </TouchableOpacity>

            {/* Video Toggle Button */}
            <TouchableOpacity
              onPress={() => setIsVideoOff(!isVideoOff)}
              className={`w-14 h-14 rounded-full items-center justify-center ${
                isVideoOff ? "bg-white" : "bg-gray-700/80"
              }`}
            >
              <Ionicons
                name={isVideoOff ? "videocam-off" : "videocam"}
                size={24}
                color={isVideoOff ? "#000" : "#FFF"}
              />
            </TouchableOpacity>

            {/* End Call Button */}
            <TouchableOpacity
              onPress={onClose}
              className="w-16 h-16 bg-red-500 rounded-full items-center justify-center shadow-xl"
            >
              <Ionicons name="call" size={28} color="#FFF" style={{ transform: [{ rotate: "135deg" }] }} />
            </TouchableOpacity>

            {/* Speaker Button */}
            <TouchableOpacity className="w-14 h-14 bg-gray-700/80 rounded-full items-center justify-center">
              <Ionicons name="volume-high" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* More Options Button */}
            <TouchableOpacity className="w-14 h-14 bg-gray-700/80 rounded-full items-center justify-center">
              <Ionicons name="ellipsis-horizontal" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Encryption Notice at Bottom */}
      <SafeAreaView edges={["bottom"]} className="bg-gray-900">
        <View className="items-center py-3">
          <View className="flex-row items-center">
            <Ionicons name="shield-checkmark" size={14} color="#14B8A6" />
            <Text className="text-gray-400 text-xs font-Jakarta ml-2">
              Video call is end-to-end encrypted
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}