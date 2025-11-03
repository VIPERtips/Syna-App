import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Lost in Space?" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Uh-oh, we can’t find this page!</Text>
        <Text style={styles.subtitle}>
          Looks like you wandered into a corner of the app that doesn’t exist. 
          Don’t worry, Blexta’s got your back.
        </Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Back to Home</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1ABC9C", 
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  link: {
    backgroundColor: "#FF6B6B", 
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 12,
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
