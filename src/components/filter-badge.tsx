import { useThemeColors } from '@/src/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Pressable, ScrollView, Text, View } from 'react-native';

type FilterBadgeProps = {
  items: {
    key: string;
    label: string;
    onRemove: () => void;
  }[];
};

export default function FilterBadge({ items }: FilterBadgeProps) {
  const colors = useThemeColors();

  const handlePress = (removeItem: () => void) => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.selectionAsync();
    }
    removeItem();
  };

  if (items.length === 0) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
    >
      {items.map(item => (
        <Pressable
          key={item.key}
          onPress={() => handlePress(item.onRemove)}
          style={({ pressed }) => ({
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
            backgroundColor: colors.chipActiveBackground,
            opacity: pressed ? 0.75 : 1,
            borderCurve: 'continuous',
          })}
        >
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.chipActiveText }}>{item.label}</Text>
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.18)',
            }}
          >
            <Ionicons name="close" size={12} color={colors.chipActiveText} />
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
