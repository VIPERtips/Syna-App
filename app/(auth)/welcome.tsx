import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from "react-native-swiper";

export default function Onboarding() {
  const swiperRef = useRef<Swiper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex === onboarding.length - 1) {
      router.replace('/(auth)/sign-up');
    } else {
      swiperRef.current?.scrollBy(1); 
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
  
  <View className="w-full flex-row justify-end px-5 pt-5">
    <TouchableOpacity
      onPress={() => router.replace('/(auth)/sign-up')}
      className="p-2"
    >
      <Text className="text-gray-600 text-md font-semibold">Skip</Text>
    </TouchableOpacity>
  </View>

  <Swiper
    ref={swiperRef}
    loop={false}
    dot={<View className="w-8 h-1 bg-gray-300 rounded-full mx-1" />}
    activeDot={<View className="w-8 h-1 bg-blue-600 rounded-full mx-1" />}
    onIndexChanged={(idx) => setActiveIndex(idx)}
    containerStyle={{ flexGrow: 1 }}
  >
    {onboarding.map((item) => (
      <View key={item.id} className="flex-1 justify-center items-center px-8">
        <Image
          source={item.image}
          className="w-full h-64"
          resizeMode="contain"
        />

        <Text className="text-black text-4xl font-bold text-center mt-10 leading-snug">
          {item.title}
        </Text>

        <Text className="text-gray-500 text-2xl text-center mt-4 leading-relaxed">
          {item.description}
        </Text>
      </View>
    ))}
  </Swiper>

<View className="w-full px-8 pb-10 mt-4">
        <CustomButton
          title={activeIndex === onboarding.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          bgVariant="primary"
          textVariant="default"
        />
      </View>
</SafeAreaView>

  );
}
