import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router/stack';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                headerTransparent: true,
                headerShadowVisible: false,
                headerLargeTitleShadowVisible: false,
                headerLargeStyle: { backgroundColor: 'transparent' },
                headerBlurEffect: 'none',
                headerBackButtonDisplayMode: 'minimal',
              }}
            >
              <Stack.Screen name="index" options={{ title: 'Doktorlar', headerLargeTitle: true }} />
              <Stack.Screen name="doctors/[id]" options={{ title: 'Doktor Profili', headerLargeTitle: false }} />
            </Stack>
          </BottomSheetModalProvider>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
