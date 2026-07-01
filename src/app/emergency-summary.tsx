import { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { listActiveMedications } from '../../src/data/repositories/medications';
import type { Medication } from '../../src/domain/models';

export default function EmergencySummary() {
    const [meds, setMeds] = useState<Medication[]>([]);

    // Recompute every time the screen is shown — always current.
    useFocusEffect(
        useCallback(() => {
            let alive = true;
            listActiveMedications().then((rows) => {
                if (alive) setMeds(rows);
            });
            return () => {
                alive = false;
            };
        }, [])
    );

    return (
        <ScrollView className="flex-1 bg-canvas px-4 pt-4">
            {/* Banner — the only place red appears, so it carries weight */}
            <View className="mb-4 rounded-2xl border-l-4 border-emergency bg-emergency/10 p-4">
                <Text className="font-medium text-emergency">
                    This summary is for emergency use. Show it to any clinician.
                </Text>
            </View>

            {/* Medications section */}
            <Section title={`Current medications (${meds.length})`}>
                {meds.length === 0 ? (
                    <Text className="text-muted">None recorded</Text>
                ) : (
                    meds.map((m) => (
                        <View key={m.id} className="flex-row justify-between py-1">
                            <Text className="text-ink">{m.name}</Text>
                            <Text className="text-muted">
                                {m.dosage}
                                {m.schedule ? ` · ${m.schedule}` : ''}
                            </Text>
                        </View>
                    ))
                )}
            </Section>

            {/* Conditions & allergies — placeholders until those record types exist */}
            <Section title="Conditions">
                <Text className="text-muted">None recorded</Text>
            </Section>
            <Section title="Allergies">
                <Text className="text-muted">None recorded</Text>
            </Section>
        </ScrollView>
    );
}

// A reusable titled card — used for each section of the summary.
function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <View
            className="mb-3 rounded-2xl bg-white p-4"
            style={{
                shadowColor: '#1C3A4B',
                shadowOpacity: 0.06,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
            }}
        >
            <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {title}
            </Text>
            <View>{children}</View>
        </View>
    );
}