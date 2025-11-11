import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

export const getAuthHeaders = async (): Promise<HeadersInit> => {
  const token = await AsyncStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};



export const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return null;

  const location = await Location.getCurrentPositionAsync({});
  
  const [placemark] = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude
  });

  return {
    lat: location.coords.latitude,
    lon: location.coords.longitude,
    city: placemark?.city || "Unknown"
  };
};


export const  fetchWeather = async (city: string) => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error fetching weather:", err);
    return { weather: [{ main: "Unknown" }] };
  }
};



export const getSeason = (month: number, lat: number) => {
  const isNorthern = lat >= 0;
  if (isNorthern) {
    if (month >= 3 && month <= 5) return "Spring";
    if (month >= 6 && month <= 8) return "Summer";
    if (month >= 9 && month <= 11) return "Autumn";
    return "Winter";
  } else {
    if (month >= 3 && month <= 5) return "Autumn";
    if (month >= 6 && month <= 8) return "Winter";
    if (month >= 9 && month <= 11) return "Spring";
    return "Summer";
  }
};
