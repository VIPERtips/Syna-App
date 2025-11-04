/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                Jakarta: ["Jakarta", "sans-serif"],
                JakartaBold: ["Jakarta-Bold", "sans-serif"],
                JakartaExtraBold: ["Jakarta-ExtraBold", "sans-serif"],
                JakartaExtraLight: ["Jakarta-ExtraLight", "sans-serif"],
                JakartaLight: ["Jakarta-Light", "sans-serif"],
                JakartaMedium: ["Jakarta-Medium", "sans-serif"],
                JakartaSemiBold: ["Jakarta-SemiBold", "sans-serif"],
            },
            colors: {
                // Palii Design System
                "pali-background": "#fafafa",
                "pali-foreground": "#1f2937",

                "pali-card": "#ffffff",
                "pali-card-foreground": "#1f2937",

                "pali-popover": "#ffffff",
                "pali-popover-foreground": "#1f2937",

                "pali-primary": "#4ea8de",
                "pali-primary-foreground": "#ffffff",

                "pali-secondary": "#18b79a",
                "pali-secondary-foreground": "#ffffff",

                "pali-accent": "#ff9e32",
                "pali-accent-foreground": "#1f2937",

                "pali-destructive": "#ef6666",
                "pali-destructive-foreground": "#ffffff",

                "pali-muted": "#f3f4f6",
                "pali-muted-foreground": "#6b7280",

                "pali-border": "#e5e7eb",
                "pali-input": "#e5e7eb",
                "pali-ring": "#4ea8de",

                // Sidebar overrides
                "pali-sidebar-background": "#fafafa",
                "pali-sidebar-foreground": "#3b3f48",
                "pali-sidebar-primary": "#1f2937",
                "pali-sidebar-primary-foreground": "#fafafa",
                "pali-sidebar-accent": "#f0f0f0",
                "pali-sidebar-accent-foreground": "#1f2937",
                "pali-sidebar-border": "#e5e7eb",
                "pali-sidebar-ring": "#4ea8de",

                // Gradients
                "pali-gradient-primary": "linear-gradient(135deg, #4ea8de 0%, #18b79a 100%)",
                "pali-gradient-warm": "linear-gradient(135deg, #ff9e32 0%, #ef6666 100%)",
                "pali-gradient-hero": "linear-gradient(180deg, #4ea8de1a 0%, #18b79a1a 100%)",
            },
        },
    },
    plugins: [],
}
