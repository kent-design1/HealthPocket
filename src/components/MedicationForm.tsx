import { useState } from 'react';
import { View, Text, TextInput, Pressable, Switch } from 'react-native';
import type { NewMedication } from '../domain/models';
import { useTranslation } from 'react-i18next';

export function MedicationForm({
                                   initial,
                                   submitLabel,
                                   onSubmit,
                               }: {
    initial?: NewMedication;
    submitLabel: string;
    onSubmit: (value: NewMedication) => void;
}) {
    const { t } = useTranslation();

    const [name, setName] = useState(initial?.name ?? '');
    const [dosage, setDosage] = useState(initial?.dosage ?? '');
    const [schedule, setSchedule] = useState(initial?.schedule ?? '');
    const [notes, setNotes] = useState(initial?.notes ?? '');
    const [active, setActive] = useState(initial?.active ?? true);

    const canSave = name.trim().length > 0;

    return (
        <View>
            <Field label={t('medications.name')} value={name} onChangeText={setName} placeholder={t('medications.namePlaceholder')} />
            <Field label={t('medications.dosage')} value={dosage} onChangeText={setDosage} placeholder={t('medications.dosagePlaceholder')} />
            <Field label={t('medications.schedule')} value={schedule} onChangeText={setSchedule} placeholder={t('medications.schedulePlaceholder')} />
            <Field label={t('medications.notes')} value={notes} onChangeText={setNotes} placeholder="" />

            <View className="mb-4 mt-2 flex-row items-center justify-between">
                <Text className="text-base text-ink">{t('medications.active')}</Text>
                <Switch value={active} onValueChange={setActive} trackColor={{ true: '#2F9E91' }} />
            </View>

            <Pressable
                onPress={() =>
                    canSave && onSubmit({ name: name.trim(), dosage, schedule, notes, active })
                }
                className={`mt-2 items-center rounded-2xl py-4 ${canSave ? 'bg-teal' : 'bg-teal/40'}`}
            >
                <Text className="text-base font-semibold text-white">{submitLabel}</Text>
            </Pressable>
        </View>
    );
}

function Field({
                   label,
                   ...props
               }: { label: string } & React.ComponentProps<typeof TextInput>) {
    return (
        <View className="mb-4">
            <Text className="mb-1 text-sm font-medium text-muted">{label}</Text>
            <TextInput
                className="rounded-xl border border-gray-200 bg-white px-3 py-3 text-base text-ink"
                placeholderTextColor="#8A95A3"
                {...props}
            />
        </View>
    );
}