import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { listMedications } from '../../../src/data/repositories/medications';
import type { Medication } from '../../../src/domain/models';

export default function MedicationsList() {
    const { t } = useTranslation();
    const router = useRouter();
    const [meds, setMeds] = useState<Medication[]>([]);

    // Reload the list every time this screen comes into focus.
    useFocusEffect(
        useCallback(() => {
            let alive = true;
            listMedications().then((rows) => {
                if (alive) setMeds(rows);
            });
            return () => {
                alive = false;
            };
        }, [])
    );

    return (
        <ScrollView className="flex-1 bg-canvas px-4 pt-4">
            {/* Add button at the top so it stays reachable as the list grows */}
            <Pressable
                onPress={() => router.push('/medications/add')}
                className="mb-4 items-center rounded-2xl bg-teal py-3"
            >
                <Text className="font-semibold text-white">＋ {t('medications.add')}</Text>
            </Pressable>

            {meds.length === 0 && (
                <Text className="mt-10 text-center text-base text-muted">
                    {t('medications.empty')}
                </Text>
            )}

            {meds.map((med) => (
                <Pressable
                    key={med.id}
                    onPress={() => router.push(`/medications/${med.id}`)}
                    className="mb-3 flex-row items-center justify-between rounded-2xl bg-white p-4"
                    style={{
                        shadowColor: '#1C3A4B',
                        shadowOpacity: 0.06,
                        shadowRadius: 8,
                        shadowOffset: { width: 0, height: 2 },
                        elevation: 2,
                    }}
                >
                    <View className="flex-1">
                        <Text className="text-lg font-semibold text-ink">{med.name}</Text>
                        {med.dosage ? (
                            <Text className="mt-0.5 text-sm text-muted">
                                {med.dosage}
                                {med.schedule ? ` · ${med.schedule}` : ''}
                            </Text>
                        ) : null}
                    </View>
                    {med.active ? (
                        <View className="ml-3 h-2.5 w-2.5 rounded-full bg-teal" />
                    ) : null}
                </Pressable>
            ))}
        </ScrollView>
    );
}