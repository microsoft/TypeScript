//// [tests/cases/compiler/objectEntriesPartialIndexedWrite.ts] ////

//// [objectEntriesPartialIndexedWrite.ts]
type Row = { amount: number } & Record<string, string>;
export function copy(row: Row, mapping: { amount: string; notes: string }) {
    const result: Partial<Row> = {};
    for (const [field, target] of Object.entries(mapping)) {
        result[field] = row[target];
    }
    return result;
}


//// [objectEntriesPartialIndexedWrite.js]
export function copy(row, mapping) {
    const result = {};
    for (const [field, target] of Object.entries(mapping)) {
        result[field] = row[target];
    }
    return result;
}
