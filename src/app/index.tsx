import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { listMedications } from '../src/data/repositories/medications';

const cardShadow = {
    shadowColor: '#1C3A4B',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
};

// Per-category accent colors, matching the mockup.
const TINT = {
    meds: '#2F9E91',
    conditions: '#3A9E6B',
    allergies: '#7C5CBF',
    visits: '#3B82C4',
    symptoms: '#E08A3C',
};

export default function Home() {
    const { t } = useTranslation();
    const router = useRouter();
    const [medCount, setMedCount] = useState(0);

    // Live medication count for the card, refreshed whenever home is shown.
    useFocusEffect(
        useCallback(() => {
            let alive = true;
            listMedications().then((rows) => alive && setMedCount(rows.length));
            return () => {
                alive = false;
            };
        }, [])
    );

    return (
        <ScrollView className="flex-1 bg-canvas px-4" contentContainerStyle={{ paddingBottom: 32 }}>
            {/* Brand header */}
            <View className="items-center pb-6 pt-4">
                <MaterialCommunityIcons name="sprout" size={30} color={TINT.meds} />
                <Text className="mt-1 text-5xl font-serif text-ink">{t('home.brand')}</Text>
                <Text className="mt-1 text-base text-muted">{t('home.tagline')}</Text>
            </View>

            {/* Category grid */}
            <View className="flex-row flex-wrap justify-between">
                <CategoryCard
                    icon="pill"
                    tint={TINT.meds}
                    title={t('home.medications')}
                    subtitle={t('home.medicationsCount', { count: medCount })}
                    onPress={() => router.push('/medications')}
                />
                <CategoryCard
                    icon="heart-pulse"
                    tint={TINT.conditions}
                    title={t('home.conditions')}
                    subtitle={t('home.comingSoon')}
                />
                <CategoryCard
                    icon="shield-check"
                    tint={TINT.allergies}
                    title={t('home.allergies')}
                    subtitle={t('home.comingSoon')}
                />
                <CategoryCard
                    icon="calendar-blank"
                    tint={TINT.visits}
                    title={t('home.visits')}
                    subtitle={t('home.comingSoon')}
                />
            </View>

            {/* Symptoms — full width */}
            <CategoryCard
                wide
                icon="emoticon-sick-outline"
                tint={TINT.symptoms}
                title={t('home.symptoms')}
                subtitle={t('home.comingSoon')}
            />

            {/* Emergency banner */}
            <Pressable
                onPress={() => router.push('/emergency-summary')}
                className="mt-3 flex-row items-center rounded-2xl bg-emergency p-4"
                style={cardShadow}
            >
                <MaterialCommunityIcons name="medical-bag" size={26} color="#fff" />
                <View className="ml-3 flex-1">
                    <Text className="text-base font-semibold text-white">{t('home.emergency')}</Text>
                    <Text className="mt-0.5 text-sm text-white/80">{t('home.emergencyHint')}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={22} color="#ffffffcc" />
            </Pressable>
        </ScrollView>
    );
}

// One category tile. `wide` makes it full-width (for Symptoms).
function CategoryCard({
                          icon,
                          tint,
                          title,
                          subtitle,
                          onPress,
                          wide,
                      }: {
    icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
    tint: string;
    title: string;
    subtitle: string;
    onPress?: () => void;
    wide?: boolean;
}) {
    return (
        <Pressable
            onPress={onPress}
            className={`mb-3 rounded-2xl bg-white p-4 ${wide ? 'w-full' : 'w-[48%]'}`}
            style={cardShadow}
        >
            <View
                className="mb-3 h-11 w-11 items-center justify-center rounded-full"
                style={{ backgroundColor: tint + '22' }}
            >
                <MaterialCommunityIcons name={icon} size={22} color={tint} />
            </View>
            <Text className="text-base font-semibold text-ink">{title}</Text>
            <Text className="mt-0.5 text-xs text-muted">{subtitle}</Text>
        </Pressable>
    );
}