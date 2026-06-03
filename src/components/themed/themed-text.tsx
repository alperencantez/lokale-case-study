import React from 'react';
import { Text, TextProps, useColorScheme } from 'react-native';

/**
 * Kişiselleştirilmiş componentler için useThemeColor alternatifi bir yaklaşım
 *
 */
export default function ThemedText(props: TextProps) {
  const isDark = useColorScheme() === 'dark';
  return (
    <Text {...props} style={[isDark ? { color: 'white' } : { color: 'black' }, props.style]}>
      {props.children}
    </Text>
  );
}
