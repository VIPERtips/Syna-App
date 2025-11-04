import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error: ", err.errors[0].longMessage);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
  if (!isLoaded) return;
  setLoading(true);
  try {
    console.log("Attempting to verify with code:", verification.code);

    const signUpAttempt = await signUp.attemptEmailAddressVerification({
      code: verification.code,
    });

    console.log("Verification response:", signUpAttempt);

    if (signUpAttempt.status === "complete") {
      console.log("Verification successful, creating user in backend...");

      await fetchAPI("http://192.168.18.17:8081/(api)/user", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          clerkId: signUpAttempt.createdSessionId,
        }),
      });

      console.log("User successfully saved to backend, activating session...");
      await setActive({ session: signUpAttempt.createdSessionId });

      setVerification((prev) => ({ ...prev, state: "success" }));

      setTimeout(() => {
        setVerification((prev) => ({ ...prev, state: "default" }));
        router.push("/(root)/(tabs)/home");
      }, 1500);
    } else {
      console.log("Verification failed:", signUpAttempt);
      setVerification({
        ...verification,
        state: "failed",
        error: "Verification failed, try again.",
      });
    }
  } catch (err: any) {
    console.log("Verification error object:", err);

    const message =
      err?.errors?.[0]?.longMessage ||
      err?.message ||
      "Something went wrong during verification.";

    Alert.alert("Verification Error", message);

    setVerification({
      ...verification,
      state: "failed",
      error: message,
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <ScrollView className="flex-1 bg-white ">
      <View className="flex-1 bg-white">
        <View className="relative mt-1">
          <Image
            source={images.bgImage}
            className="z-0 w-full h-[300px] rounded-2xl"
            resizeMode="cover"
          />
          <Text className="absolute bottom-5 left-5 text-3xl text-black font-JakartaBold">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Full Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(val) => setForm({ ...form, name: val })}
            variant="filled"
            iconStyle="me-2"
          />

          <InputField
            label="Email Address"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(val) => setForm({ ...form, email: val })}
            variant="filled"
            iconStyle="me-2"
          />

          <View className="relative">
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              secureTextEntry={!showPassword}
              value={form.password}
              onChangeText={(val) => setForm({ ...form, password: val })}
              variant="filled"
              iconStyle="me-2"
            />
            <TouchableOpacity
              className="absolute right-4 top-[40px]"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={22}
                color="gray"
                className="w-5 h-5 opacity-70 "
              />
            </TouchableOpacity>
          </View>

          <View className="mt-6">
            <CustomButton
              title={loading ? "Processing..." : "Sign Up"}
              onPress={onSignUpPress}
              bgVariant="pali-primary"
              textVariant="pali-primary-foreground"
              disabled={loading}
            />
          </View>
          <OAuth />

          <ReactNativeModal
            isVisible={verification.state === "success"}
            onBackdropPress={() =>
              setVerification({ ...verification, state: "default" })
            }
            backdropOpacity={0.5}
            animationIn="zoomIn"
            animationOut="zoomOut"
            useNativeDriver
          >
            <View className="bg-white rounded-2xl px-6 py-8 items-center shadow-lg min-h-[300px]">
              <Image
                source={images.check}
                className="w-[120px] h-[120px] mb-6"
                resizeMode="contain"
              />

              <Text className="text-black text-3xl font-JakartaBold mb-4 text-center">
                Verification Successful!
              </Text>

              <Text className="text-gray-500 text-center mb-6 px-4">
                Your account has been verified. Tap continue to start exploring
                the app.
              </Text>

              <CustomButton
                title="Browse Home"
                onPress={() => {
                  setVerification((prev) => ({ ...prev, state: "default" }));
                  router.push("/(root)/(tabs)/home");
                }}
                bgVariant="pali-primary"
                textVariant="pali-primary-foreground"
                className="w-full mt-5"
              />
            </View>
          </ReactNativeModal>
          <ReactNativeModal
            isVisible={verification.state === "pending"}
            backdropOpacity={0.5}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriver
          >
            <View className="bg-white rounded-2xl px-6 py-8 items-center shadow-lg min-h-[220px]">
              <Ionicons
                name="hand-left-outline"
                size={60}
                color="#FACC15"
                style={{ marginBottom: 20, textAlign: "center" }}
              />

              <Text className="text-black text-2xl font-JakartaExtraBold mb-2 text-center">
                Verification Pending
              </Text>

              <Text className="text-gray-500 text-center px-4 font-Jakarta mb-5">
                We sent a verification code to {form.email || "your email"}.
                Please check your inbox and enter the code to continue.
              </Text>
              <InputField
                label="Code"
                icon={icons.lock}
                placeholder="12345"
                value={verification.code}
                iconStyle="me-2"
                keyBoardType="numeric"
                onChangeText={(code) =>
                  setVerification({
                    ...verification,
                    code,
                  })
                }
              />
              {verification.error && (
                <Text className="text-red-500 text-sm mt-1">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title={loading ? "Verifying..." : "Verify Email"}
                onPress={onVerifyPress}
                className="mt-5"
              
                tone="success"
                disabled={loading}
              />
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#00AA13"
                  className="mt-4"
                />
              )}
            </View>
          </ReactNativeModal>
        </View>
      </View>
      <View className="flex-row justify-center mt-5">
        <Text className="text-gray-500 text-[14px]">
          Already have an account?{" "}
        </Text>
        <Link
          href="/(auth)/sign-in"
          className="text-primary-500 font-JakartaSemiBold text-[14px]"
        >
          Log In
        </Link>
      </View>
    </ScrollView>
  );
}
