import { useThemeColors } from '@/src/hooks/useThemeColors';
import { Doctor } from '@/src/types/doctor';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import ThemedButton from './themed/themed-button';

type DoctorListCardProps = { doctor: Doctor; onPress?: (dr: Doctor) => void };

export default function DoctorListCard({ doctor, onPress }: DoctorListCardProps) {
  const colors = useThemeColors();
  const [imgError, setImgError] = useState<boolean>(false);

  const handleProfilePress = () => {
    if (process.env.EXPO_OS === 'ios') {
      Haptics.selectionAsync();
    }
    onPress?.(doctor);
  };

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        borderCurve: 'continuous',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Pressable
        onPress={handleProfilePress}
        style={({ pressed }) => ({
          flexDirection: 'row',
          gap: 14,
          opacity: pressed ? 0.8 : 1,
          borderCurve: 'continuous',
        })}
      >
        {/* Avatar */}
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            borderWidth: 2.5,
            borderColor: colors.avatarBorder,
            overflow: 'hidden',
          }}
        >
          {doctor.imageUrl && !imgError ? (
            <Image
              source={{ uri: doctor.imageUrl }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
              transition={300}
              onError={() => setImgError(true)}
            />
          ) : (
            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="person" size={28} color={colors.avatarBorder} />
            </View>
          )}
        </View>

        {/* Info */}
        <View style={{ flex: 1, gap: 4 }}>
          <Text selectable style={{ fontSize: 16, fontWeight: '700', color: colors.text, letterSpacing: -0.2 }}>
            {doctor.name}
          </Text>

          <Text style={{ fontSize: 14, fontWeight: '500', color: colors.primary }}>{doctor.specialty}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 1 }}>
            <Ionicons name="location-sharp" size={12} color="gray" />
            <Text selectable style={{ fontSize: 12, color: colors.textSecondary }}>
              {doctor.address.city}, {doctor.address.district}
            </Text>
          </View>
        </View>
      </Pressable>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 14,
          paddingTop: 14,
          borderTopWidth: 0.5,
          borderTopColor: colors.separator,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Ionicons name="star" size={12} color={colors.starColor} />
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.text, fontVariant: ['tabular-nums'] }}>
            {doctor.rating.toFixed(1)}
          </Text>
          <Text style={{ fontSize: 12, color: colors.textSecondary }}>({doctor.reviewCount} Değerlendirme)</Text>
        </View>
        {/* Detay Button */}
        <ThemedButton content="Detay" variant="primary" onPress={handleProfilePress} width={72} height="auto" />
      </View>
    </View>
  );
}
