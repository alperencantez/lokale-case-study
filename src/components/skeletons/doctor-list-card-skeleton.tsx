import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

export default function DoctorListCardSkeleton() {
  const colors = useThemeColors();
  const pulse = useRef(new Animated.Value(0.55)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.55, duration: 700, useNativeDriver: true }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [pulse]);

  const skeletonStyle = { backgroundColor: colors.border, opacity: pulse } as const;

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
      <View style={{ flexDirection: 'row', gap: 14 }}>
        <Animated.View style={[{ width: 60, height: 60, borderRadius: 30 }, skeletonStyle]} />

        <View style={{ flex: 1, gap: 8, paddingTop: 4 }}>
          <Animated.View style={[{ width: '62%', height: 16, borderRadius: 8 }, skeletonStyle]} />
          <Animated.View style={[{ width: '38%', height: 14, borderRadius: 7 }, skeletonStyle]} />

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 }}>
            <Animated.View style={[{ width: 12, height: 12, borderRadius: 6 }, skeletonStyle]} />
            <Animated.View style={[{ width: '48%', height: 12, borderRadius: 6 }, skeletonStyle]} />
          </View>
        </View>
      </View>

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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
          <Animated.View style={[{ width: 12, height: 12, borderRadius: 6 }, skeletonStyle]} />
          <Animated.View style={[{ width: 28, height: 14, borderRadius: 7 }, skeletonStyle]} />
          <Animated.View style={[{ width: 92, height: 12, borderRadius: 6 }, skeletonStyle]} />
        </View>

        <Animated.View style={[{ width: 78, height: 34, borderRadius: 10 }, skeletonStyle]} />
      </View>
    </View>
  );
}
