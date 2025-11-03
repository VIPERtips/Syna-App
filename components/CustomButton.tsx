import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type CustomButtonProps = {
  onPress?: () => void;
  title: string | React.ReactNode;
  bgVariant?: 
    | "primary" 
    | "secondary" 
    | "success" 
    | "info" 
    | "warning" 
    | "danger" 
    | "ghost" 
    | "link"
    | "outline";
  textVariant?: "default" | "light" | "dark";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
};

export default function CustomButton({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  iconLeft,
  iconRight,
  className = "",
  disabled = false,
  ...props
}: CustomButtonProps) {
  const colorMap: Record<string, string> = {
    primary: "#0286ff",
    secondary: "#e2e8f0",
    success: "#28a745",
    info: "#17a2b8",
    warning: "#ffc107",
    danger: "#dc3545",
    ghost: "transparent",
    link: "transparent",
    outline: "transparent",
  };

  const textColorMap: Record<string, string> = {
    default:
      bgVariant === "ghost" || bgVariant === "link" || bgVariant === "outline"
        ? "#0286ff"
        : bgVariant === "secondary"
        ? "#1f2937"
        : "#ffffff",
    light: "#f9f9f9",
    dark: "#000000",
  };

  const borderColorMap: Record<string, string> = {
    ghost: "#0286ff",
    link: "transparent",
    outline: "#0286ff",
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      className={`w-full p-4 rounded-full flex-row items-center justify-center ${className}`}
      style={{
        backgroundColor: disabled ? "#9ca3af" : colorMap[bgVariant] || "#0286ff",
        borderWidth:
          bgVariant === "ghost" || bgVariant === "link" || bgVariant === "outline"
            ? 2
            : 0,
        borderColor: borderColorMap[bgVariant] || "transparent",
        opacity: disabled ? 0.6 : 1,
      }}
      {...props}
    >
      {iconLeft && <View className="mr-2 me-2">{iconLeft}</View>}

      <Text
        className="font-semibold text-lg text-center"
        style={{ color: textColorMap[textVariant] || "#ffffff" }}
      >
        {title}
      </Text>

      {iconRight && <View className="ml-2 ms-2">{iconRight}</View>}
    </TouchableOpacity>
  );
}