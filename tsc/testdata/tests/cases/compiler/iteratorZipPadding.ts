// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true
// @exactOptionalPropertyTypes: true, false
// @declaration: true

const a: [Iterable<number>, ...Iterable<number>[]] = [[1, 2], [3]];
const b = Iterator.zip(a, { mode: "longest", padding: [0] }).toArray();
const c: (number | undefined)[][] = b;
const d: number[][] = b;

const e: Record<string, Iterable<number>> = { a: [1], b: [2, 3] };
const f = Iterator.zipKeyed(e, { mode: "longest", padding: {} }).toArray();
const g: Record<string, number | undefined>[] = f;
const h: Record<string, number>[] = f;

declare const i: Record<string, number>;
const j = Iterator.zipKeyed({ a: [1], b: [2, 3] }, { mode: "longest", padding: i }).toArray();
const k: { a: number | undefined; b: number | undefined; }[] = j;
const l: { a: number; b: number; }[] = j;

const m = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0, ""] }).toArray();
const n: [number, string][] = m;
const o = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0, b: "" } }).toArray();
const p: { a: number; b: string; }[] = o;

const q = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0] }).toArray();
const r: [number | undefined, string | undefined][] = q;
const s: [number, string][] = q;
const t = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0 } }).toArray();
const u: { a: number | undefined; b: string | undefined; }[] = t;
const v: { a: number; b: string; }[] = t;

declare const w: readonly [number, string];
const x: [number, string][] = Iterator.zip([[1], ["a"]], { mode: "longest", padding: w }).toArray();
declare const y: [number, string?];
const z = Iterator.zip([[1], ["a"]], { mode: "longest", padding: y }).toArray();
const a1: [number, string][] = z;

declare const b1: [Iterable<number>] | [Iterable<number>, Iterable<number>];
const c1 = Iterator.zip(b1, { mode: "longest", padding: [0] }).toArray();
const d1: number[][] = c1;
declare const e1: { a: Iterable<number>; } | { b: Iterable<string>; };
const f1 = Iterator.zipKeyed(e1, { mode: "longest", padding: { a: 0 } }).toArray();
const g1: ({ a: number; } | { b: string; })[] = f1;

declare const h1: { a: number; } | { b: string; };
const i1 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: h1 }).toArray();
const j1: { a: number; b: string; }[] = i1;

const k1 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: { a: undefined, b: 0 } }).toArray();
const l1: { a: number; b: number; }[] = k1;

declare const m1: { [K in `a${string}`]: Iterable<number>; };
const n1 = Iterator.zipKeyed(m1, { mode: "longest", padding: {} }).toArray();
const o1: { [K in `a${string}`]: number; }[] = n1;

declare const p1: unique symbol;
const q1: { [p1]: number; }[] = Iterator.zipKeyed({ [p1]: [1] }, { mode: "longest", padding: { [p1]: 0 } }).toArray();

declare const r1: Record<string, number> & { a: number; };
const s1 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: r1 }).toArray();
const t1: { a: number; b: number | undefined; }[] = s1;
const u1: { a: number; b: number; }[] = s1;

declare const v1: [number] | [number, string];
const w1 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: v1 }).toArray();
const x1: [number, string | undefined][] = w1;
const y1: [number, string][] = w1;

const z1: [number | undefined, number][] = Iterator.zip([[1], [2]], { mode: "longest", padding: [undefined, 0] }).toArray();
const a2: { a: number | undefined; b: number; }[] = k1;
