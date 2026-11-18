// @strict: true
// @target: es2015

interface Row {
    [name: string]: any;
}
interface Entity {
    id: number;
}
declare const result: Promise<Row | null>;

export async function load() {
    return (await Promise.all([result, result])) as Entity[];
}
