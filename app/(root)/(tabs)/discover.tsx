
import DoctorCard from "@/components/DoctorCard";
import { getAuthHeaders } from "@/lib";
import { fetchAPI } from "@/lib/fetch";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const FALLBACK_DOCTORS = [
  {
    doctorId: "1",
    fullName: "Austine M",
    specialty: "Dentist",
    imageUrl: "https://avatar.iran.liara.run/public/8",
    avgRating: 5.0,
    reviewCount: 150,
    availableSlots: ["10:00 AM", "11:00 AM", "1:00 PM"],
  },
  {
    doctorId: "2",
    fullName: "Lavet M",
    specialty: "General Physician",
    imageUrl: "https://avatar.iran.liara.run/public/4",
    avgRating: 4.9,
    reviewCount: 120,
    availableSlots: ["9:30 AM", "12:30 PM", "2:30 PM"],
  },
  {
    doctorId: "3",
    fullName: "Talent Z",
    specialty: "Cardiologist",
    imageUrl: "https://avatar.iran.liara.run/public/37",
    avgRating: 5.0,
    reviewCount: 100,
    availableSlots: ["10:00 AM", "11:00 AM", "3:00 PM"],
  },
  {
    doctorId: "4",
    fullName: "Tanaka M",
    specialty: "Surgeon",
    imageUrl: "https://avatar.iran.liara.run/public/85",
    avgRating: 4.8,
    reviewCount: 130,
    availableSlots: ["9:00 AM", "11:30 AM", "1:30 PM"],
  },
];


export default function DiscoverDoctors() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterActive, setFilterActive] = useState(false);
  const [sortingActive, setSortingActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const headers = await getAuthHeaders();
        const res = await fetchAPI(
          `${process.env.EXPO_PUBLIC_SERVER_URL}/api/doctors/verified`,
          { headers }
        );
        setDoctors(res.data || FALLBACK_DOCTORS);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        // Use fallback data on error
        setDoctors(FALLBACK_DOCTORS);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(
    (d) =>
      d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  const ListHeader = () => (
    <View className="px-4 pb-3">
      {/* Search Bar */}
      <View className="bg-gray-100 rounded-xl flex-row items-center px-4 py-3 mb-4">
        <Ionicons name="search-outline" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          className="flex-1 ml-3 text-gray-900 font-Jakarta"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filter and Sorting */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity
          onPress={() => setFilterActive(!filterActive)}
          className={`flex-row items-center px-4 py-3 rounded-xl flex-1 mr-2 ${
            filterActive ? "bg-teal-500" : "bg-gray-100"
          }`}
        >
          <Ionicons
            name="funnel-outline"
            size={18}
            color={filterActive ? "#FFF" : "#6B7280"}
          />
          <View className="ml-2 flex-1">
            <Text
              className={`font-JakartaBold ${
                filterActive ? "text-white" : "text-gray-900"
              }`}
            >
              Filter
            </Text>
            <Text
              className={`text-xs ${
                filterActive ? "text-teal-100" : "text-gray-500"
              }`}
            >
              To Doctors
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSortingActive(!sortingActive)}
          className={`flex-row items-center px-4 py-3 rounded-xl flex-1 ml-2 ${
            sortingActive ? "bg-teal-500" : "bg-gray-100"
          }`}
        >
          <View className="flex-1 items-end mr-2">
            <Text
              className={`font-JakartaBold ${
                sortingActive ? "text-white" : "text-gray-900"
              }`}
            >
              Sorting
            </Text>
            <Text
              className={`text-xs ${
                sortingActive ? "text-teal-100" : "text-gray-500"
              }`}
            >
              From top
            </Text>
          </View>
          <Ionicons
            name="swap-vertical-outline"
            size={18}
            color={sortingActive ? "#FFF" : "#6B7280"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#14B8A6" />
          <Text className="mt-4 text-gray-600 font-Jakarta">
            Loading doctors...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-JakartaBold text-gray-900">Doctors</Text>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Doctors List */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.doctorId}
        renderItem={({ item }) => <DoctorCard doctor={item} />}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text className="mt-4 text-gray-500 font-JakartaBold text-lg">
              No doctors found
            </Text>
            <Text className="mt-2 text-gray-400 font-Jakarta text-center px-8">
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
