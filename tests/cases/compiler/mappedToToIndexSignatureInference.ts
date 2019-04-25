declare const fn: <K extends string, V>(object: { [Key in K]: V }) => object;
declare const a: { [index: string]: number };
fn(a);

// Repro from #30218

declare function enumValues<K extends string, V extends string>(e: Record<K, V>): V[];

enum E { A = 'foo', B = 'bar' }

let x: E[] = enumValues(E);
