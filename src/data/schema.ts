import type { SQLiteDatabase } from 'expo-sqlite';

// Bump this when the table shape changes, and add a matching migration block.
const CURRENT_VERSION = 1;

export async function migrate(db: SQLiteDatabase): Promise<void> {
    // The database remembers its own version number. We read it first.
    const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
    let version = row?.user_version ?? 0;

    // Migration 1: create the medications table if we're starting fresh.
    if (version < 1) {
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS medications (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        dosage TEXT NOT NULL DEFAULT '',
        schedule TEXT NOT NULL DEFAULT '',
        active INTEGER NOT NULL DEFAULT 1,
        notes TEXT NOT NULL DEFAULT '',
        createdAt INTEGER NOT NULL,
        updatedAt INTEGER NOT NULL
      );
    `);
        version = 1;
    }

    // Future: if (version < 2) { ...add a column... version = 2; }

    // Record the new version so next launch knows what's already been done.
    await db.execAsync(`PRAGMA user_version = ${CURRENT_VERSION}`);
}