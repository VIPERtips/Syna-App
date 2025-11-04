import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CustomButtonProps = {
  onPress?: () => void;
  title: string | React.ReactNode;
  bgVariant?:
    | "pali-primary"
    | "pali-secondary"
    | "pali-accent"
    | "pali-destructive"
    | "pali-ghost"
    | "pali-outline"
    | "hero-gradient";

  textVariant?:
    | "pali-primary-foreground"
    | "pali-secondary-foreground"
    | "pali-accent-foreground"
    | "pali-destructive-foreground"
    | "default"
    | "light"
    | "dark";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
};

export default function CustomButton({
  onPress,
  title,
  bgVariant = "pali-primary",
  textVariant = "pali-primary-foreground",
  iconLeft,
  iconRight,
  className = "",
  disabled = false,
  ...props
}: CustomButtonProps) {
  const bgClassMap: Record<string, string> = {
    "pali-primary": "bg-pali-primary",
    "pali-secondary": "bg-pali-secondary",
    "pali-accent": "bg-pali-accent",
    "pali-destructive": "bg-pali-destructive",
    "pali-ghost": "bg-transparent",
    "pali-outline": "bg-transparent",
    "hero-gradient": "bg-gradient-to-r from-primary to-secondary text-white shadow-m hover:scale-105 transition-all v"
  };

  const textClassMap: Record<string, string> = {
    "pali-primary-foreground": "text-pali-primary-foreground",
    "pali-secondary-foreground": "text-pali-secondary-foreground",
    "pali-accent-foreground": "text-pali-accent-foreground",
    "pali-destructive-foreground": "text-pali-destructive-foreground",
    default: "text-white",
    light: "text-white",
    dark: "text-black",
  };

  const borderClassMap: Record<string, string> = {
    "pali-ghost": "border-2 border-pali-primary",
    "pali-outline": "border-2 border-pali-primary",
  };

  const bgClass = disabled
    ? "bg-gray-400"
    : bgClassMap[bgVariant] ?? "bg-pali-primary";
  const textClass = textClassMap[textVariant] ?? "text-white";
  const borderClass = borderClassMap[bgVariant] ?? "";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      className={`w-full p-4 rounded-full flex-row items-center justify-center ${bgClass} ${borderClass} ${className} ${
        disabled ? "opacity-60" : "opacity-100"
      }`}
      {...props}
    >
      {iconLeft && <View className="mr-2 shadow-md hover:shadow-lg hover:scale-105 transition-all">{iconLeft}</View>}

      <Text className={`font-semibold text-lg text-center ${textClass}`}>
        {title}
      </Text>

      {iconRight && <View className="ml-2 shadow-md hover:shadow-lg hover:scale-105 transition-all">{iconRight}</View>}
    </TouchableOpacity>
  );
}
