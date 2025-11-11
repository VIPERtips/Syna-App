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
import VideoCallScreen from "@/components/VideoCallScreen";

interface Message {
  id: string;
  text: string;
  sender: "user" | "doctor";
  timestamp: string;
  read?: boolean;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hi Tadiwa Blexta",
    sender: "user",
    timestamp: "11:05",
    read: true,
  },
  {
    id: "2",
    text: "My child has a toothache.",
    sender: "user",
    timestamp: "11:05",
    read: true,
  },
  {
    id: "3",
    text: "How severe? Mild, Moderate, Severe.",
    sender: "doctor",
    timestamp: "11:05",
    read: true,
  },
  {
    id: "4",
    text: "Moderate.",
    sender: "user",
    timestamp: "11:05",
    read: true,
  },
  {
    id: "5",
    text: "Try a cold compress. Book a pediatric dentist? (Yes | No)",
    sender: "doctor",
    timestamp: "11:05",
    read: true,
  },
  {
    id: "6",
    text: "Yes.",
    sender: "user",
    timestamp: "11:05",
    read: true,
  },
];

export default function DoctorChat() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  const doctorName = params.doctorName || "Dr. Tadiwa Blexta";
  const doctorSpecialty = params.specialty || "Pediatric";
  const doctorImage = params.image || "https://avatar.iran.liara.run/public/17";

  const handleInputFocus = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2500);
  };

  const handleVideoCall = () => {
    setShowVideoCall(true);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === "user";

    return (
      <View
        className={`mb-3 ${isUser ? "items-end" : "items-start"}`}
      >
        <View
          className={`max-w-[75%] px-4 py-3 rounded-2xl ${
            isUser
              ? "bg-blue-500 rounded-tr-sm"
              : "bg-gray-700 rounded-tl-sm"
          }`}
        >
          <Text className="text-white font-Jakarta text-base">
            {item.text}
          </Text>
        </View>
        <View className="flex-row items-center mt-1 px-1">
          <Text className="text-gray-500 text-xs font-Jakarta">
            {item.timestamp}
          </Text>
          {isUser && item.read && (
            <Ionicons name="checkmark-done" size={14} color="#3B82F6" className="ml-1" />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900" edges={["top"]}>
      
      <View className="bg-gray-800 px-4 py-3 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          
          <Image
            source={{ uri: doctorImage }}
            className="w-10 h-10 rounded-full bg-gray-700"
          />
          
          <View className="ml-3 flex-1">
            <Text className="text-white font-JakartaBold text-base">
              {doctorName}
            </Text>
            <Text className="text-gray-400 text-xs font-Jakarta">
              {doctorSpecialty}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleVideoCall} className="mr-4">
            <Ionicons name="videocam" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Badge */}
      <View className="items-center py-3">
        <View className="bg-gray-800 px-4 py-1 rounded-full">
          <Text className="text-gray-400 text-xs font-Jakarta">To day</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Encryption Footer */}
      <View className="bg-gray-800 px-4 py-2 items-center border-t border-gray-700">
        <View className="flex-row items-center">
          <Ionicons name="lock-closed" size={12} color="#14B8A6" />
          <Text className="text-gray-400 text-xs font-Jakarta ml-2">
            Messages are end-to-end encrypted
          </Text>
        </View>
      </View>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View className="bg-gray-900 px-4 py-3 flex-row items-center border-t border-gray-800">
          <TouchableOpacity className="mr-3">
            <Ionicons name="add-circle" size={28} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="flex-1 bg-gray-800 rounded-full px-4 py-3 flex-row items-center">
            <TextInput
              placeholder="Type here"
              placeholderTextColor="#6B7280"
              className="flex-1 text-white font-Jakarta"
              value={inputText}
              onChangeText={setInputText}
              onFocus={handleInputFocus}
            />
            <TouchableOpacity>
              <Ionicons name="attach" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="ml-3 bg-blue-500 w-11 h-11 rounded-full items-center justify-center">
            <Ionicons name="send" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Coming Soon Modal */}
      <Modal
        visible={showComingSoon}
        transparent
        animationType="fade"
        onRequestClose={() => setShowComingSoon(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowComingSoon(false)}
          className="flex-1 bg-black/70 justify-center items-center"
        >
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(200)}
            className="bg-gray-800 rounded-3xl p-8 mx-6 items-center shadow-2xl"
          >
            <View className="bg-teal-500 w-16 h-16 rounded-full items-center justify-center mb-4">
              <Ionicons name="chatbubbles" size={32} color="#FFF" />
            </View>
            <Text className="text-white text-2xl font-JakartaBold text-center mb-2">
              Coming Soon! 🚀
            </Text>
            <Text className="text-gray-400 text-center font-Jakarta">
              Real-time messaging is currently under development
            </Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

     
      <Modal
        visible={showVideoCall}
        animationType="slide"
        onRequestClose={() => setShowVideoCall(false)}
      >
        <VideoCallScreen
          doctorName={doctorName}
          doctorSpecialty={doctorSpecialty}
          doctorImage={doctorImage}
          onClose={() => setShowVideoCall(false)}
        />
      </Modal>
    </SafeAreaView>
  );
}

