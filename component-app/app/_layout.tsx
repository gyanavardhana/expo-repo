import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FinanceTracker } from '@/components/example-components/FinancialTracker';
export default function RootLayout() {


  return (
    <View style={{"backgroundColor": "purple"}}>
      <FinanceTracker />
    </View>
  );
}
