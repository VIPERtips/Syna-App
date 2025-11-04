import { useState } from "react"
import { Image, Text, TextInput, View } from "react-native"

type InputFieldProps = {
  label?: string
  icon?: any
  value?: string
  onChangeText?: (val: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "number-pad" | "decimal-pad"
  variant?: "filled" | "outlined"
  tone?: "default" | "success" | "info" | "warning" | "danger"
  className?: string
  containerStyle?: string
  inputStyle?: string
  iconStyle?: string
  labelStyle?: string
  [key: string]: any
}

export default function InputField({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  variant = "filled",
  tone = "default",
  className = "",
  containerStyle = "",
  inputStyle = "",
  iconStyle = "",
  labelStyle = "",
  ...props
}: InputFieldProps) {
  const [focused, setFocused] = useState(false)

  const toneColors: Record<string, { bg: string; border: string; focus: string }> = {
    default: {
      bg: "bg-pali-card",
      border: "border-pali-border",
      focus: "border-pali-primary",
    },
    success: {
      bg: "bg-green-100",
      border: "border-green-400",
      focus: "border-green-600",
    },
    info: {
      bg: "bg-blue-100",
      border: "border-blue-400",
      focus: "border-blue-600",
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-400",
      focus: "border-yellow-600",
    },
    danger: {
      bg: "bg-red-100",
      border: "border-red-400",
      focus: "border-red-600",
    },
  }

  const color = toneColors[tone]

  const baseContainer =
    "flex-row items-center w-full rounded-2xl px-4 py-3 transition-all duration-150"

  const variants: Record<"filled" | "outlined", string> = {
    filled: focused
      ? `${color.bg} border-2 ${color.focus}`
      : `${color.bg} border ${color.border}`,
    outlined: focused
      ? `border-2 ${color.focus} bg-transparent`
      : `border ${color.border} bg-transparent`,
  }

  const placeholderColor = focused ? "#666" : "#999"

  return (
    <View className={`w-full mb-4 ${className}`}>
      {label && (
        <Text
          className={`text-[15px] font-JakartaSemiBold mb-2 text-pali-foreground ${labelStyle}`}
        >
          {label}
        </Text>
      )}

      <View className={`${baseContainer} ${variants[variant]} ${containerStyle}`}>
        {icon && (
          <Image
            source={icon}
            resizeMode="contain"
            className={`w-5 h-5 mr-3 opacity-80 ${iconStyle}`}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          keyboardAppearance="dark"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholderTextColor={placeholderColor}
          className={`flex-1 text-[15px] font-JakartaMedium text-pali-foreground ${inputStyle}`}
          {...props}
        />
      </View>
    </View>
  )
}
