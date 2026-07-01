import { useEffect, useState } from 'react';
import { ScrollView, Pressable, Text, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MedicationForm } from '../../../src/components/MedicationForm';
import {
    getMedication,
    updateMedication,
    deleteMedication,
} from '../../../src/data/repositories/medications';
import type { Medication } from '../../../src/domain/models';
import { useTranslation } from 'react-i18next';

export default function EditMedication() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [med, setMed] = useState<Medication | null>(null);
    const { t } = useTranslation();

    // Load the medication this screen is editing, by its id.
    useEffect(() => {
        if (id) getMedication(id).then(setMed);
    }, [id]);

    // While loading, show nothing (a spinner would go here later).
    if (!med) {
        return <ScrollView className="flex-1 bg-canvas" />;
    }

    function confirmDelete() {
        Alert.alert(t('medications.deleteConfirm'), undefined, [
            { text: t('medications.cancel'), style: 'cancel' },
            {
                text: t('medications.delete'),
                style: 'destructive',
                onPress: async () => {
                    await deleteMedication(med!.id);
                    router.back();
                },
            },
        ]);
    }

    return (
        <ScrollView className="flex-1 bg-canvas px-4 pt-4" keyboardShouldPersistTaps="handled">
            <MedicationForm
                initial={med}
                submitLabel={t('medications.saveChanges')}
                onSubmit={async (value) => {
                    await updateMedication(med.id, value);
                    router.back();
                }}
            />

            <Pressable onPress={confirmDelete} className="mt-3 items-center rounded-2xl bg-emergency py-4">
                <Text className="text-base font-semibold text-white">{t('medications.delete')}</Text>
            </Pressable>
        </ScrollView>
    );
}