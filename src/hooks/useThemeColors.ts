import { useColorScheme } from 'react-native';
import { ThemeColors, darkTheme, lightTheme } from '../constants/colors';

export function useThemeColors(): ThemeColors {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}
