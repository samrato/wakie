import { SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { View } from "react-native";
import { useRouter, useSegments } from "expo-router"; // Make sure this import exists

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const { checkAuth, user, token } = useAuthStore();
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await checkAuth();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setIsReady(true);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!isReady) {
    return <View style={{ flex: 1, backgroundColor: 'white' }} />;
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
        {isReady && <AuthRedirectHandler user={user} token={token} />}
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}

function AuthRedirectHandler({ user, token }) {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    
    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [user, token, segments]);

  return null;
}