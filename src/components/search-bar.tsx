import { useThemeColors } from '@/src/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChangeText, placeholder }: SearchBarProps) {
  const colors = useThemeColors();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.searchBackground,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        gap: 10,
      }}
    >
      <Ionicons name="search" size={18} color="gray" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? 'Doktor, klinik veya branş ara'}
        placeholderTextColor={colors.placeholderText}
        style={{ flex: 1, fontSize: 16, color: colors.text, padding: 0 }}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>
  );
}
