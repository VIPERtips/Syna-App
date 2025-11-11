import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface DoctorCardProps {
  doctor: {
    doctorId: string;
    fullName: string;
    specialty: string;
    imageUrl?: string;
    avgRating?: number;
    reviewCount?: number;
    availableSlots?: string[];
  };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/doctor-details/[doctorId]",
      params: { doctorId: doctor.doctorId },
    });
  };


  const doctorImage = doctor.imageUrl || "https://via.placeholder.com/100";


  const timeSlots = doctor.availableSlots?.slice(0, 3) || ["11:30 AM", "12:30 PM", "1:30 PM"];

  return (
    <TouchableOpacity
  onPress={handlePress}
  style={{
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 12,
    marginRight: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  }}
>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <View style={{ position: "relative" }}>
      <Image
        source={{ uri: doctorImage }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 16,
          backgroundColor: "#e5e7eb",
        }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          bottom: 2,
          right: 2,
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: "#14b8a6",
          borderWidth: 2,
          borderColor: "white",
        }}
      />
    </View>

    <View style={{ flex: 1, marginLeft: 16 }}>
      <Text style={{ fontFamily: "JakartaBold", fontSize: 16, color: "#111827" }}>
        {doctor.fullName}
      </Text>
      <Text style={{ fontFamily: "Jakarta", fontSize: 14, color: "#6b7280", marginTop: 2 }}>
        {doctor.specialty}
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
        <View style={{ flexDirection: "row", marginRight: 8 }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= Math.floor(doctor.avgRating || 4.5) ? "star" : "star-outline"}
              size={14}
              color="#F59E0B"
              style={{ marginRight: 2 }}
            />
          ))}
        </View>
        <Text style={{ fontFamily: "JakartaBold", fontSize: 14, color: "#111827" }}>
          {doctor.avgRating?.toFixed(1) || "4.5"}
        </Text>
        <Text style={{ fontFamily: "Jakarta", fontSize: 12, color: "#6b7280", marginLeft: 4 }}>
          • {doctor.reviewCount || 85} reviews
        </Text>
      </View>
    </View>
  </View>

  {timeSlots && timeSlots.length > 0 && (
    <View style={{ marginTop: 12 }}>
      <View style={{ flexDirection: "row" }}>
        {timeSlots.map((slot, index) => (
          <View
            key={index}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
              marginRight: 8,
              backgroundColor: index === 1 ? "#14b8a6" : "#f3f4f6",
            }}
          >
            <Text
              style={{
                fontFamily: "JakartaSemiBold",
                fontSize: 12,
                color: index === 1 ? "#fff" : "#374151",
              }}
            >
              {slot}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )}
</TouchableOpacity>

  );
}