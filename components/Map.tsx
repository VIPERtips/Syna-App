/* eslint-disable react-hooks/exhaustive-deps */
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { 
  ActivityIndicator, 
  Alert, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity 
} from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

interface MapProps {
  onLocationSelect: (data: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

const Map: React.FC<MapProps> = ({ onLocationSelect }) => {
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: -17.824858,
    longitude: 31.053028,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [addressLoading, setAddressLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required to select your clinic.");
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setRegion((prev) => ({ ...prev, latitude, longitude }));
      setMarker({ latitude, longitude });

      const address = await getAddressFromCoords(latitude, longitude);
      setCurrentAddress(address);
      onLocationSelect({ latitude, longitude, address });
      setLoading(false);
    })();
  }, []);

  const getAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const addressData = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (!addressData || !addressData[0]) return "Unknown location";

      return [
        addressData[0].name,
        addressData[0].street,
        addressData[0].district,
        addressData[0].subregion,
        addressData[0].city,
        addressData[0].region,
      ]
        .filter(Boolean)
        .join(", ");
    } catch (err) {
      console.log("Reverse geocode failed:", err);
      return "Unknown location";
    }
  };

  const handleLocationChange = async (latitude: number, longitude: number) => {
    setMarker({ latitude, longitude });
    setAddressLoading(true);
    const address = await getAddressFromCoords(latitude, longitude);
    setCurrentAddress(address);
    setAddressLoading(false);
    onLocationSelect({ latitude, longitude, address });
  };

  const handleMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    handleLocationChange(latitude, longitude);
  };

  const recenterMap = async () => {
    setLoading(true);
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }, 1000);

    handleLocationChange(latitude, longitude);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#008080" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        mapType="standard"
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {marker && (
          <Marker
            coordinate={marker}
            draggable
            title="Clinic Location"
            description="Drag to adjust position"
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              handleLocationChange(latitude, longitude);
            }}
          />
        )}
      </MapView>

      

      {/* Recenter Button */}
      <TouchableOpacity style={styles.recenterButton} onPress={recenterMap}>
        <Ionicons name="locate" size={24} color="#008080" />
      </TouchableOpacity>

      {/* Zoom Controls */}
      <View style={styles.zoomControls}>
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={() => {
            mapRef.current?.animateToRegion({
              ...region,
              latitudeDelta: region.latitudeDelta / 2,
              longitudeDelta: region.longitudeDelta / 2,
            });
          }}
        >
          <Ionicons name="add" size={24} color="#008080" />
        </TouchableOpacity>
        <View style={styles.zoomDivider} />
        <TouchableOpacity
          style={styles.zoomButton}
          onPress={() => {
            mapRef.current?.animateToRegion({
              ...region,
              latitudeDelta: region.latitudeDelta * 2,
              longitudeDelta: region.longitudeDelta * 2,
            });
          }}
        >
          <Ionicons name="remove" size={24} color="#008080" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666",
  },
  addressCard: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  addressLoader: {
    marginVertical: 8,
  },
  helpText: {
    fontSize: 12,
    color: "#999",
    marginTop: 8,
    fontStyle: "italic",
  },
  recenterButton: {
    position: "absolute",
    bottom: 100,
    right: 16,
    backgroundColor: "white",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  zoomControls: {
    position: "absolute",
    bottom: 24,
    right: 16,
    backgroundColor: "white",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  zoomButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
  },
});

export default Map;