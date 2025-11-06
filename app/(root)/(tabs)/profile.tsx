import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [docName, setDocName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [clinic, setClinic] = useState("");
  const [userType, setUserType] = useState("patient");

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SERVER_URL}/api/users/current?clerkUserId=${user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("Backend response:", data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const testUser = {
    firstName: "Blessed",
    lastName: "Tadiwa",
    phone: "+263 789 773 911",
    email: "blessed.tadiwa@email.com",
    location: "Harare, Zimbabwe",
    avatar: "https://i.pravatar.cc/150?img=2",
    // Doctor specific
    specialty: "General Practitioner",
    clinic: "Harare Medical Centre",
    experience: "8 years",
    license: "ZIM-MED-12345",
    // Patient specific
    bloodType: "O+",
    dateOfBirth: "15 March 1990",
  };

  const toggleModal = () => setModalVisible(!isModalVisible);

  const submitDoctorRequest = () => {
    console.log({ docName, specialty, clinic });
    setModalVisible(false);
  };

  useEffect(() => {
    fetchUser();
    console.log("calling");
  }, []);

  // Render Patient Profile
  const renderPatientProfile = () => (
    <>
      <LinearGradient
        colors={["#14b8a6", "#0f766e"]} // from-teal-500 to-teal-600
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "100%",
          borderRadius: 24,
          padding: 32,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: user?.imageUrl }}
            style={{ width: 56, height: 56, borderRadius: 28, marginEnd: 5 }}
          />
          <View className="ml-5 flex-1">
            <Text className="text-white text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </Text>
            <Text className="text-teal-100 text-sm mt-1">Patient Account</Text>
          </View>
        </View>
      </LinearGradient>

      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Your Health Journey
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-3xl font-bold text-teal-600">12</Text>
            <Text className="text-gray-600 text-xs mt-1">Appointments</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="items-center flex-1">
            <Text className="text-3xl font-bold text-teal-600">5</Text>
            <Text className="text-gray-600 text-xs mt-1">Doctors</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="items-center flex-1">
            <Text className="text-3xl font-bold text-teal-600">34</Text>
            <Text className="text-gray-600 text-xs mt-1">Reviews</Text>
          </View>
        </View>
      </View>

      {/* Personal Information */}
      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Personal Information
        </Text>

        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">Email Address</Text>
          <Text className="text-gray-900 text-base">
            {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">Phone Number</Text>
          <Text className="text-gray-900 text-base">{user?.phone}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">Location</Text>
          <Text className="text-gray-900 text-base">{user?.id}</Text>
        </View>
      </View>

      {/* Medical History */}
      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Medical History
        </Text>

        <View className="bg-gray-50 rounded-2xl p-4 mb-3">
          <Text className="text-gray-900 font-semibold mb-1">Allergies</Text>
          <Text className="text-gray-600 text-sm">Penicillin, Pollen</Text>
        </View>

        <View className="bg-gray-50 rounded-2xl p-4 mb-3">
          <Text className="text-gray-900 font-semibold mb-1">
            Current Medications
          </Text>
          <Text className="text-gray-600 text-sm">Lisinopril 10mg (Daily)</Text>
        </View>

        <View className="bg-gray-50 rounded-2xl p-4">
          <Text className="text-gray-900 font-semibold mb-1">
            Chronic Conditions
          </Text>
          <Text className="text-gray-600 text-sm">Hypertension</Text>
        </View>
      </View>

      {/* Recent Appointments */}
      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Recent Appointments
        </Text>

        <View className="border-l-4 border-teal-500 pl-4 mb-4">
          <Text className="text-gray-900 font-semibold">Dr. Sarah Johnson</Text>
          <Text className="text-gray-600 text-sm">General Checkup</Text>
          <Text className="text-gray-500 text-xs mt-1">
            Oct 28, 2025 • 10:00 AM
          </Text>
        </View>

        <View className="border-l-4 border-gray-300 pl-4 mb-4">
          <Text className="text-gray-900 font-semibold">Dr. Michael Chen</Text>
          <Text className="text-gray-600 text-sm">
            Blood Pressure Monitoring
          </Text>
          <Text className="text-gray-500 text-xs mt-1">
            Oct 15, 2025 • 2:30 PM
          </Text>
        </View>

        <TouchableOpacity className="mt-2">
          <Text className="text-teal-600 font-semibold text-center">
            View All Appointments →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Upgrade to Doctor */}
      <TouchableOpacity
        onPress={toggleModal}
        className="bg-gradient-to-r from-teal-600 to-teal-700 w-full rounded-3xl p-6 mb-4 shadow-lg"
        activeOpacity={0.9}
      >
        <Text className="text-white text-lg font-bold">Are you a Doctor?</Text>
        <Text className="text-teal-100 text-sm mt-1">
          Request a doctor account to start accepting patients
        </Text>
      </TouchableOpacity>

      {/* Settings Options */}
      <View className="bg-white w-full rounded-3xl p-6 mb-6 shadow-lg">
        <TouchableOpacity className="py-4 border-b border-gray-100">
          <Text className="text-gray-900 font-semibold">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-4 border-b border-gray-100">
          <Text className="text-gray-900 font-semibold">Privacy Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-4 border-b border-gray-100">
          <Text className="text-gray-900 font-semibold">Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-4">
          <Text className="text-red-600 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  // Render Doctor Profile
  const renderDoctorProfile = () => (
    <>
      {/* Header Card */}
      <LinearGradient
        colors={["#14b8a6", "#0f766e"]} // from-teal-500 to-teal-600
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "100%",
          borderRadius: 24,
          padding: 32,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-24 h-24 rounded-full border-4 border-white"
          />
          <View className="ml-5 flex-1">
            <Text className="text-white text-2xl font-bold">
              Dr. {user?.firstName} {user?.lastName}
            </Text>
            <Text className="text-blue-100 text-sm mt-1">{user.specialty}</Text>
            <View className="flex-row items-center mt-2">
              <View className="bg-white/20 px-3 py-1 rounded-full mr-2">
                <Text className="text-white text-xs font-medium">
                  {user.experience}
                </Text>
              </View>
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Text className="text-white text-xs font-medium">⭐ 4.8</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Practice Overview
        </Text>
        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <Text className="text-3xl font-bold text-blue-600">247</Text>
            <Text className="text-gray-600 text-xs mt-1">Patients</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="items-center flex-1">
            <Text className="text-3xl font-bold text-blue-600">89</Text>
            <Text className="text-gray-600 text-xs mt-1">This Month</Text>
          </View>
          <View className="w-px bg-gray-200" />
          <View className="items-center flex-1">
            <Text className="text-3xl font-bold text-blue-600">156</Text>
            <Text className="text-gray-600 text-xs mt-1">Reviews</Text>
          </View>
        </View>
      </View>

      {/* Professional Information */}
      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Professional Information
        </Text>

        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">Specialty</Text>
          <Text className="text-gray-900 text-base">{user.specialty}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">Primary Clinic</Text>
          <Text className="text-gray-900 text-base">{user.clinic}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">Medical License</Text>
          <Text className="text-gray-900 text-base">{user.license}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">
            Years of Experience
          </Text>
          <Text className="text-gray-900 text-base">{user.experience}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 text-xs mb-1">Phone</Text>
          <Text className="text-gray-900 text-base">{user.phone}</Text>
        </View>

        <View>
          <Text className="text-gray-500 text-xs mb-1">Email</Text>
          <Text className="text-gray-900 text-base">{user.email}</Text>
        </View>
      </View>

      {/* Availability */}
      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Availability This Week
        </Text>

        <View className="flex-row justify-between mb-3">
          <View className="flex-1 bg-green-50 rounded-xl p-3 mr-2">
            <Text className="text-gray-900 font-semibold text-xs">Mon</Text>
            <Text className="text-green-600 text-xs mt-1">9AM-5PM</Text>
          </View>
          <View className="flex-1 bg-green-50 rounded-xl p-3 mr-2">
            <Text className="text-gray-900 font-semibold text-xs">Tue</Text>
            <Text className="text-green-600 text-xs mt-1">9AM-5PM</Text>
          </View>
          <View className="flex-1 bg-green-50 rounded-xl p-3 mr-2">
            <Text className="text-gray-900 font-semibold text-xs">Wed</Text>
            <Text className="text-green-600 text-xs mt-1">9AM-5PM</Text>
          </View>
          <View className="flex-1 bg-gray-100 rounded-xl p-3">
            <Text className="text-gray-900 font-semibold text-xs">Thu</Text>
            <Text className="text-gray-500 text-xs mt-1">Off</Text>
          </View>
        </View>

        <TouchableOpacity className="bg-blue-50 rounded-xl p-3 items-center">
          <Text className="text-blue-600 font-semibold">Manage Schedule</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Appointments */}
      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Today's Appointments
        </Text>

        <View className="bg-blue-50 rounded-2xl p-4 mb-3">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold">Tendai Moyo</Text>
              <Text className="text-gray-600 text-sm">
                General Consultation
              </Text>
              <Text className="text-blue-600 text-xs mt-1">
                10:00 AM - 10:30 AM
              </Text>
            </View>
            <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-xl">
              <Text className="text-white text-xs font-semibold">Start</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-gray-50 rounded-2xl p-4 mb-3">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-gray-900 font-semibold">Chipo Ndlovu</Text>
              <Text className="text-gray-600 text-sm">Follow-up Visit</Text>
              <Text className="text-gray-600 text-xs mt-1">
                11:00 AM - 11:30 AM
              </Text>
            </View>
            <View className="bg-gray-200 px-4 py-2 rounded-xl">
              <Text className="text-gray-600 text-xs font-semibold">
                Upcoming
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="mt-2">
          <Text className="text-blue-600 font-semibold text-center">
            View Full Schedule →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Recent Reviews */}
      <View className="bg-white w-full rounded-3xl p-6 mb-4 shadow-lg">
        <Text className="text-gray-900 text-lg font-bold mb-4">
          Recent Reviews
        </Text>

        <View className="mb-4 pb-4 border-b border-gray-100">
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-900 font-semibold">Patient #1247</Text>
            <Text className="text-yellow-500 ml-2">⭐⭐⭐⭐⭐</Text>
          </View>
          <Text className="text-gray-600 text-sm">
            "Very professional and caring. Explained everything clearly."
          </Text>
          <Text className="text-gray-400 text-xs mt-1">2 days ago</Text>
        </View>

        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-900 font-semibold">Patient #1198</Text>
            <Text className="text-yellow-500 ml-2">⭐⭐⭐⭐⭐</Text>
          </View>
          <Text className="text-gray-600 text-sm">
            "Best doctor I've had. Takes time to listen and understand."
          </Text>
          <Text className="text-gray-400 text-xs mt-1">1 week ago</Text>
        </View>

        <TouchableOpacity className="mt-2">
          <Text className="text-blue-600 font-semibold text-center">
            View All Reviews →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <View className="bg-white w-full rounded-3xl p-6 mb-6 shadow-lg">
        <TouchableOpacity className="py-4 border-b border-gray-100">
          <Text className="text-gray-900 font-semibold">Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-4 border-b border-gray-100">
          <Text className="text-gray-900 font-semibold">Practice Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-4 border-b border-gray-100">
          <Text className="text-gray-900 font-semibold">Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity className="py-4">
          <Text className="text-red-600 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Toggle for Demo */}
        <View className="bg-white rounded-2xl p-2 mb-4 flex-row shadow-sm">
          <TouchableOpacity
            onPress={() => setUserType("patient")}
            className={`flex-1 py-3 rounded-xl ${
              userType === "patient" ? "bg-teal-600" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                userType === "patient" ? "text-white" : "text-gray-600"
              }`}
            >
              Patient View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType("doctor")}
            className={`flex-1 py-3 rounded-xl ${
              userType === "doctor" ? "bg-blue-600" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                userType === "doctor" ? "text-white" : "text-gray-600"
              }`}
            >
              Doctor View
            </Text>
          </TouchableOpacity>
        </View>

        {userType === "patient"
          ? renderPatientProfile()
          : renderDoctorProfile()}
      </ScrollView>

      {/* Doctor Request Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={{ justifyContent: "flex-end", margin: 0 }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View className="bg-white rounded-t-3xl p-6 shadow-2xl">
          <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />

          <Text className="text-gray-900 text-2xl font-bold mb-2">
            Become a Doctor
          </Text>
          <Text className="text-gray-600 text-sm mb-6">
            Fill in your details to request a doctor account
          </Text>

          <Text className="text-gray-700 font-semibold mb-2">Full Name</Text>
          <TextInput
            placeholder="Dr. John Doe"
            className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 mb-4 text-base"
            value={docName}
            onChangeText={setDocName}
          />

          <Text className="text-gray-700 font-semibold mb-2">Specialty</Text>
          <TextInput
            placeholder="General Practitioner"
            className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 mb-4 text-base"
            value={specialty}
            onChangeText={setSpecialty}
          />

          <Text className="text-gray-700 font-semibold mb-2">
            Clinic / Hospital
          </Text>
          <TextInput
            placeholder="City Clinic, Harare"
            className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 mb-6 text-base"
            value={clinic}
            onChangeText={setClinic}
          />

          <TouchableOpacity
            onPress={submitDoctorRequest}
            className="bg-teal-600 rounded-2xl py-4 items-center mb-3 shadow-lg"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-base">
              Submit Request
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} className="py-3 items-center">
            <Text className="text-gray-500 font-medium">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
