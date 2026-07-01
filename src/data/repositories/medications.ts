import { getDb } from '../db';
import type { Medication, NewMedication } from '../../domain/models';

// SQLite stores booleans as 0/1. This is the row shape as it comes OUT of the DB.
interface MedicationRow {
    id: string;
    name: string;
    dosage: string;
    schedule: string;
    active: number; // 0 or 1
    notes: string;
    createdAt: number;
    updatedAt: number;
}

// Convert a raw DB row into a clean Medication (0/1 → real boolean).
function toModel(row: MedicationRow): Medication {
    return { ...row, active: row.active === 1 };
}

// Make a unique id for a new medication.
function makeId(): string {
    return `med_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// READ: all medications, active ones first, then alphabetical.
export async function listMedications(): Promise<Medication[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<MedicationRow>(
        'SELECT * FROM medications ORDER BY active DESC, name COLLATE NOCASE ASC'
    );
    return rows.map(toModel);
}

export async function listActiveMedications(): Promise<Medication[]> {
    const db = await getDb();
    const rows = await db.getAllAsync<MedicationRow>(
        'SELECT * FROM medications WHERE active = 1 ORDER BY name COLLATE NOCASE ASC'
    );
    return rows.map(toModel);
}


// READ: one medication by id (or null if not found).
export async function getMedication(id: string): Promise<Medication | null> {
    const db = await getDb();
    const row = await db.getFirstAsync<MedicationRow>(
        'SELECT * FROM medications WHERE id = ?',
        id
    );
    return row ? toModel(row) : null;
}

// CREATE: insert a new medication and return the saved version.
export async function createMedication(input: NewMedication): Promise<Medication> {
    const db = await getDb();
    const now = Date.now();
    const med: Medication = { id: makeId(), createdAt: now, updatedAt: now, ...input };
    await db.runAsync(
        `INSERT INTO medications (id, name, dosage, schedule, active, notes, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        med.id, med.name, med.dosage, med.schedule,
        med.active ? 1 : 0, med.notes, med.createdAt, med.updatedAt
    );
    return med;
}

// UPDATE: change an existing medication.
export async function updateMedication(id: string, input: NewMedication): Promise<void> {
    const db = await getDb();
    await db.runAsync(
        `UPDATE medications
       SET name = ?, dosage = ?, schedule = ?, active = ?, notes = ?, updatedAt = ?
     WHERE id = ?`,
        input.name, input.dosage, input.schedule,
        input.active ? 1 : 0, input.notes, Date.now(), id
    );
}

// DELETE: remove a medication.
export async function deleteMedication(id: string): Promise<void> {
    const db = await getDb();
    await db.runAsync('DELETE FROM medications WHERE id = ?', id);
}