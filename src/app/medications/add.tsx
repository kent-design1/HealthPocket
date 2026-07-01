import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MedicationForm } from '../../../src/components/MedicationForm';
import { createMedication } from '../../../src/data/repositories/medications';
import { useTranslation } from 'react-i18next';


export default function AddMedication() {
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <ScrollView className="flex-1 bg-canvas px-4 pt-4" keyboardShouldPersistTaps="handled">
            <MedicationForm submitLabel={t('medications.save')}
                            onSubmit={async (value) => {
                    await createMedication(value);
                    router.back();
                }}
            />
        </ScrollView>
    );
}