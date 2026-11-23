// @target: es2022
// @strict: false

type Row = { amount: number } & Record<string, string>;
export function copy(row: Row, mapping: { amount: string; notes: string }) {
    const result: Partial<Row> = {};
    for (const [field, target] of Object.entries(mapping)) {
        result[field] = row[target];
    }
    return result;
}
