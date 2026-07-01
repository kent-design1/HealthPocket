import '../../global.css';
import '../../src/i18n';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function RootLayout() {

    const { t } = useTranslation();

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
            <Stack.Screen name="index" options={{ title: t('home.brand') }} />
            <Stack.Screen name="medications/index" options={{ title: t('medications.title') }} />
            <Stack.Screen name="medications/add" options={{ title: t('medications.add'), presentation: 'modal' }} />
            <Stack.Screen name="medications/[id]" options={{ title: t('medications.edit') }} />
            <Stack.Screen name="emergency-summary" options={{ title: t('home.emergency') }} />
        </Stack>
    );
}