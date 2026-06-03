import { useThemeColors } from '@/src/hooks/useThemeColors';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, PressableProps, Text } from 'react-native';

type ThemedButtonProps = {
  content: string | React.JSX.Element;
  variant: 'primary' | 'ghost' | 'link';
  width?: number | string;
  height?: number | string;
};

export default function ThemedButton(props: PressableProps & ThemedButtonProps) {
  const colors = useThemeColors();
  const spinValue = useRef(new Animated.Value(0)).current;
  const { content, variant, disabled, ...pressableProps } = props;

  useEffect(() => {
    if (!disabled) {
      spinValue.stopAnimation();
      spinValue.setValue(0);
      return;
    }

    const animation = Animated.loop(Animated.timing(spinValue, { toValue: 1, duration: 900, useNativeDriver: true }));
    animation.start();

    return () => animation.stop();
  }, [disabled, spinValue]);

  const spinnerRotation = spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  if (props.variant === 'link') {
    return (
      <Pressable {...props}>
        {typeof props.content === 'string' ? (
          <Text style={{ fontSize: 14, fontWeight: '600', color: colors.primary }}>{props.content}</Text>
        ) : (
          props.content
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={disabled}
      // @ts-ignore
      style={({ pressed }) => ({
        flex: props.width && props.height ? undefined : 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: props.width || undefined,
        height: props.height || undefined,
        paddingVertical: 12,
        borderRadius: 14,
        backgroundColor: variant === 'primary' ? colors.primary : colors.searchBackground,
        borderWidth: 1,
        borderColor: variant === 'primary' ? colors.primary : colors.border,
        opacity: disabled ? 0.6 : pressed ? 0.75 : 1,
        borderCurve: 'continuous',
      })}
      {...pressableProps}
    >
      {disabled ? (
        <Animated.View style={{ transform: [{ rotate: spinnerRotation }] }}>
          <Ionicons name="reload" size={18} color={variant === 'primary' ? '#ffffff' : colors.text} />
        </Animated.View>
      ) : typeof content === 'string' ? (
        <Text style={{ fontSize: 14, fontWeight: '700', color: variant === 'primary' ? '#fff' : colors.text }}>
          {content}
        </Text>
      ) : (
        content
      )}
    </Pressable>
  );
}
