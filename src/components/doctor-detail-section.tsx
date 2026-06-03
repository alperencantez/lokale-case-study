import { Text, View } from 'react-native';
import { useThemeColors } from '../hooks/useThemeColors';

export function DoctorDetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  const colors = useThemeColors();
  return (
    <View style={{ backgroundColor: colors.card, borderRadius: 20, padding: 18, gap: 14 }}>
      <Text style={{ fontSize: 17, fontWeight: '700', color: colors.text }}>{title}</Text>
      {children}
    </View>
  );
}

export function DoctorDetailSectionDetailRow({ label, value }: { label: string; value: string }) {
  const colors = useThemeColors();
  return (
    <View style={{ gap: 4 }}>
      <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textSecondary }}>{label}</Text>
      <Text style={{ fontSize: 15, fontWeight: '500', color: colors.text }}>{value}</Text>
    </View>
  );
}

export function DoctorDetailInfoBox({ label, value }: { label: string; value: string }) {
  const colors = useThemeColors();
  const isDark = colors.background === '#000000';
  return (
    <View
      style={{
        flexGrow: 1,
        minWidth: '30%',
        backgroundColor: isDark ? '#232326' : '#f7fbfb',
        borderRadius: 16,
        paddingVertical: 13,
        paddingHorizontal: 14,
        gap: 7,
        borderWidth: 1,
        borderColor: isDark ? '#343438' : '#dceeee',
        borderCurve: 'continuous',
        boxShadow: isDark
          ? '0 8px 20px rgba(0, 0, 0, 0.18), 0 1px 0 rgba(255, 255, 255, 0.03) inset'
          : '0 8px 20px rgba(35, 224, 224, 0.08), 0 1px 0 rgba(255, 255, 255, 0.7) inset',
      }}
    >
      <View style={{ width: 28, height: 4, borderRadius: 999, backgroundColor: colors.primary, opacity: 0.9 }} />
      <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textSecondary, letterSpacing: 0.2 }}>{label}</Text>
      <Text style={{ fontSize: 16, fontWeight: '800', color: colors.text, letterSpacing: -0.2 }}>{value}</Text>
    </View>
  );
}
