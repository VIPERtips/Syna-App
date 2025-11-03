import { icons } from "@/constants"
import { Tabs } from "expo-router"
import { Image, Platform, View, useWindowDimensions } from "react-native"

const TabIcon = ({
  source,
  focused,
}: {
  source: any
  focused: boolean
}) => {
  const { width } = useWindowDimensions()
  const iconSize = width < 380 ? 24 : width < 600 ? 28 : 32

  return (
    <View
      className={`items-center justify-center rounded-full mt-3 ${
        focused ? "bg-[#2563EB]/10" : ""
      }`}
      style={{
        width: iconSize + 28,
        height: iconSize + 28,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        className={`items-center justify-center rounded-full ${
          focused ? "bg-[#2563EB]" : "bg-[#E0E7FF]"
        }`}
        style={{
          width: iconSize + 8,
          height: iconSize + 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={source}
          resizeMode="contain"
          style={{
            width: iconSize,
            height: iconSize,
            tintColor: focused ? "white" : "#2563EB",
          }}
        />
      </View>
    </View>
  )
}

export default function Layout() {
  const { width } = useWindowDimensions()
  const isTablet = width > 768
  const horizontalMargin = isTablet ? 80 : 20
  const tabHeight = isTablet ? 50 : 50

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#6B7280",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 0,
        },
        tabBarStyle: {
          backgroundColor: "#F3F4F6",
          borderRadius: 40,
          overflow: "hidden",
          marginHorizontal: horizontalMargin,
          marginBottom: Platform.OS === "ios" ? 30 : 20,
          height: tabHeight,
          position: "absolute",
          alignSelf: "center",
          width: width - horizontalMargin * 1.5,
          justifyContent: "center",
          alignItems: "center",
          elevation: 8,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      
    
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  )
}
