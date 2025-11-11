import { fetchWeather, getAuthHeaders, getLocation, getSeason } from "@/lib";
import { fetchAPI } from "@/lib/fetch";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import uuid from "react-native-uuid";

const { width } = Dimensions.get("window");

export default function HealthTipsCarousel() {
  const [tips, setTips] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);

        const headers = {
          ...(await getAuthHeaders()),
          "Content-Type": "application/json",
        };

        let conversationId = await AsyncStorage.getItem("conversationId");
        if (!conversationId) {
          conversationId = uuid.v4().toString();
          await AsyncStorage.setItem("conversationId", conversationId);
        }

        const locationCoords = await getLocation();
        if (!locationCoords) return;

        const weatherData = await fetchWeather(locationCoords.city);

        const season = getSeason(new Date().getMonth() + 1, locationCoords.lat);

        const body = {
          location: locationCoords.city,
          season,
          weather: weatherData.weather[0].main,
          message: "Fetching tips",
        };

        const res = await fetchAPI(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/api/health-tips?conversationId=defaultconvo`,
          { method: "POST", headers, body: JSON.stringify(body) }
        );
        console.log(res.tips);
        setTips(res.tips);
      } catch (error) {
        console.log("Error fetching health tips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  return (
    <LinearGradient
      colors={["#18b79a", "#18b89a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "rgba(147, 51, 234, 0.2)",
        shadowColor: "#00D4AA",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <View className="px-6 mb-4">
        <Text className="text-xl font-JakartaBold text-pali-card">
          Health Tips
        </Text>
        <Text className="text-sm text-gray-200 font-JakartaMedium mt-1">
          Daily wellness reminders for you
        </Text>
      </View>

      <View className="mt-6 cursor-pointer">
        {loading ? (
          <Text className="text-white font-JakartaExtraBold text-center mt-4">
            Loading health tips…
          </Text>
        ) : (
          <FlatList
            data={tips}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <View
                className="bg-white rounded-2xl p-4 mr-4 shadow-md"
                style={{ width: width * 0.7, marginEnd: 5 }}
              >
                <View className="flex-row items-start mb-2">
                  <View
                    className="w-12 h-12 rounded-2xl items-center justify-center mr-4 me-2"
                    style={{ backgroundColor: item.color + "20" }}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={24}
                      color={item.color}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-900 font-bold text-base mb-1">
                      {item.tip}
                    </Text>
                    <Text className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
}
