import '../../global.css';
import '../../src/i18n';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: '#EEF2F5' },
                headerShadowVisible: false,
                headerTintColor: '#1C3A4B',
                headerTitleStyle: { fontWeight: '600' },
                contentStyle: { backgroundColor: '#EEF2F5' },
            }}
        >
            <Stack.Screen name="index" options={{ title: 'Carna' }} />
            <Stack.Screen name="about" options={{ title: 'About' }} />
        </Stack>
    );
}