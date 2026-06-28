// Fields every record shares.
export interface BaseRecord {
    id: string;
    createdAt: number; // stored as a timestamp (milliseconds)
    updatedAt: number;
}

// A medication is a base record plus its own fields.
export interface Medication extends BaseRecord {
    name: string;
    dosage: string;
    schedule: string;   // free text for now, e.g. "Twice daily"
    active: boolean;    // currently taking — drives the emergency summary
    notes: string;
}

// When CREATING one, the id and timestamps don't exist yet — we generate them.
// So the input shape is a Medication minus the base fields.
export type NewMedication = Omit<Medication, keyof BaseRecord>;