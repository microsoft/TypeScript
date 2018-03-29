// @strict: true
export class Entry<T extends Table> {
    private _table: T | null = null;
    createSubsetForDirectory(): void {
        const entry = new Entry<T>();
        this._table!.fn(entry);
    }
}

export abstract class Table {
    fn(directoryEntry: Entry<this>): this | null {
        return null;
    }
}