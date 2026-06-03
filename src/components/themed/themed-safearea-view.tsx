import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

type ThemedSafeAreaViewProps = {
  children: React.ReactNode;
};

export default function ThemedSafeAreaView(props: ThemedSafeAreaViewProps & SafeAreaViewProps) {
  return <SafeAreaView {...props}>{props.children}</SafeAreaView>;
}
