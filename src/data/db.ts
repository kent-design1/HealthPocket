import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';
import { migrate } from './schema';

let dbPromise: Promise<SQLiteDatabase> | null = null;

// One shared database connection for the whole app.
export function getDb(): Promise<SQLiteDatabase> {
    if (!dbPromise) {
        dbPromise = (async () => {
            const db = await openDatabaseAsync('carna.db');
            await migrate(db); // make sure the tables exist before anyone uses it
            return db;
        })();
    }
    return dbPromise;
}