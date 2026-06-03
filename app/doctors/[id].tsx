import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  DoctorDetailInfoBox,
  DoctorDetailSection,
  DoctorDetailSectionDetailRow,
} from '@/src/components/doctor-detail-section';
import mockData from '@/src/data/mock_data.json';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { Doctor } from '@/src/types/doctor';

const DEFAULT_COUNTRY = 'Türkiye';

export default function DoctorDetailScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const scrollY = useSharedValue(0);

  const doctor = useMemo(() => {
    if (!params.id) return undefined;
    return (mockData as Doctor[]).find(item => item.id === params.id);
  }, [params.id]);

  const bio = useMemo(() => {
    if (!doctor) return '';
    return `${doctor.specialty} alanında ${doctor.experienceYears} yıllık klinik deneyime sahip. ${doctor.address.city} bölgesinde hizmet veriyor ve hasta takibinde ulaşılabilir, düzenli ve pratik bir yaklaşım sunuyor.`;
  }, [doctor]);

  const heroImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 260], [0, -130], Extrapolation.CLAMP);
    const scale = interpolate(scrollY.value, [-220, 0], [1.35, 1], Extrapolation.CLAMP);

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const heroContentStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 180], [1, 0], Extrapolation.CLAMP);
    return { opacity };
  });

  const onScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  if (!doctor) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          gap: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text, textAlign: 'center' }}>
          Doktor bulunamadı
        </Text>
        <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center' }}>
          İstenen profil mevcut değil veya kaldırılmış olabilir.
        </Text>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            paddingHorizontal: 18,
            paddingVertical: 12,
            borderRadius: 12,
            backgroundColor: colors.primary,
            opacity: pressed ? 0.85 : 1,
            borderCurve: 'continuous',
          })}
        >
          <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: '700' }}>Geri dön</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: doctor?.name, headerLargeTitle: false }} />
      <Animated.ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 0, gap: 16, paddingBottom: 40 }}
        scrollEventThrottle={16}
        onScroll={onScroll}
      >
        <View
          style={{
            height: 320,
            borderRadius: 28,
            overflow: 'hidden',
            backgroundColor: colors.searchBackground,
            borderCurve: 'continuous',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
          }}
        >
          <Animated.View style={[{ position: 'absolute', inset: 0 }, heroImageStyle]}>
            {doctor?.imageUrl ? (
              <Image source={{ uri: doctor.imageUrl }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
            ) : (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="person" size={72} color={colors.avatarBorder} />
              </View>
            )}
          </Animated.View>

          <View
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            }}
          />

          <Animated.View style={[{ flex: 1, justifyContent: 'flex-end', padding: 18 }, heroContentStyle]}>
            <View
              style={{
                gap: 12,
              }}
            >
              <View style={{ gap: 6 }}>
                <Text style={{ fontSize: 22, fontWeight: '800', color: '#ffffff', letterSpacing: -0.3 }}>
                  {doctor?.name || 'Doktor'}
                </Text>
                {doctor?.specialty && (
                  <Text style={{ fontSize: 15, fontWeight: '600', color: '#ffffff' }}>{doctor.specialty}</Text>
                )}
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="location-sharp" size={14} color="#ffffff" />
                <Text style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.92)' }}>
                  {doctor.address.city}, {doctor.address.district}, {doctor.address.country ?? DEFAULT_COUNTRY}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: 18,
            gap: 16,
            borderCurve: 'continuous',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
          }}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <DoctorDetailInfoBox label="Puan" value={doctor?.rating?.toFixed(1) ?? '--'} />
            <DoctorDetailInfoBox label="Deneyim" value={`${doctor?.experienceYears ?? '--'} yıl`} />
            <DoctorDetailInfoBox label="Uzaklık" value={`${doctor?.distanceKm?.toFixed(1) ?? '--'} km`} />
          </View>
        </View>

        {bio && (
          <DoctorDetailSection title="Hakkında">
            <Text style={{ fontSize: 14, lineHeight: 22, color: colors.text }}>{bio}</Text>
          </DoctorDetailSection>
        )}

        <DoctorDetailSection title="Temel profil bilgileri">
          {doctor?.specialty && <DoctorDetailSectionDetailRow label="Uzmanlık" value={doctor.specialty} />}
          {(doctor?.address?.city || doctor?.address?.district) && (
            <DoctorDetailSectionDetailRow label="Konum" value={`${doctor.address.city} / ${doctor.address.district}`} />
          )}
          {doctor?.onlineAppointment && (
            <DoctorDetailSectionDetailRow label="Çevrim içi randevu" value={doctor.onlineAppointment ? 'Var' : 'Yok'} />
          )}
          {doctor?.nextAvailableSlot && (
            <DoctorDetailSectionDetailRow
              label="Sonraki uygun saat"
              value={new Date(doctor.nextAvailableSlot).toLocaleString('tr-TR')}
            />
          )}
        </DoctorDetailSection>

        <DoctorDetailSection title="İletişim bilgileri">
          {doctor?.phone && <DoctorDetailSectionDetailRow label="Telefon" value={doctor.phone} />}
          {doctor?.insurance?.length > 0 && (
            <DoctorDetailSectionDetailRow label="Sigortalar" value={doctor.insurance.join(', ')} />
          )}
        </DoctorDetailSection>
      </Animated.ScrollView>
    </>
  );
}
