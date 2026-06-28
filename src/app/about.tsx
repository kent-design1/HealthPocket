import { View, Text } from 'react-native';

export default function About() {
    return (
        <View className="flex-1 items-center justify-center bg-canvas px-6">
            <Text className="text-2xl font-serif text-ink">About Carna</Text>
            <Text className="mt-3 text-center text-base text-muted">
                Your health record, private and on your device.
            </Text>
        </View>
    );
}