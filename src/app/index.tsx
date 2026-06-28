import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { getDb } from '../../src/data/db';

export default function Home() {
    const { t } = useTranslation();

    useEffect(() => {
        getDb()
            .then(async (db) => {
                // Ask SQLite to list its tables — proof the DB opened and migrated.
                const tables = await db.getAllAsync(
                    "SELECT name FROM sqlite_master WHERE type='table'"
                );
                console.log('✅ Database ready. Tables:', tables);
            })
            .catch((err) => console.log('❌ Database error:', err));
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-canvas px-6">
            <Text className="text-5xl font-serif text-ink">{t('home.brand')}</Text>
            <Text className="mt-2 text-base text-muted">{t('home.tagline')}</Text>
            <Link href="/about" className="mt-8 text-base font-semibold text-teal">
                {t('home.about')} →
            </Link>
        </View>
    );
}