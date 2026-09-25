//// [tests/cases/compiler/iteratorZipPadding.ts] ////

//// [iteratorZipPadding.ts]
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


//// [iteratorZipPadding.js]
"use strict";
const a = [[1, 2], [3]];
const b = Iterator.zip(a, { mode: "longest", padding: [0] }).toArray();
const c = b;
const d = b;
const e = { a: [1], b: [2, 3] };
const f = Iterator.zipKeyed(e, { mode: "longest", padding: {} }).toArray();
const g = f;
const h = f;
const j = Iterator.zipKeyed({ a: [1], b: [2, 3] }, { mode: "longest", padding: i }).toArray();
const k = j;
const l = j;
const m = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0, ""] }).toArray();
const n = m;
const o = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0, b: "" } }).toArray();
const p = o;
const q = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0] }).toArray();
const r = q;
const s = q;
const t = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0 } }).toArray();
const u = t;
const v = t;
const x = Iterator.zip([[1], ["a"]], { mode: "longest", padding: w }).toArray();
const z = Iterator.zip([[1], ["a"]], { mode: "longest", padding: y }).toArray();
const a1 = z;
const c1 = Iterator.zip(b1, { mode: "longest", padding: [0] }).toArray();
const d1 = c1;
const f1 = Iterator.zipKeyed(e1, { mode: "longest", padding: { a: 0 } }).toArray();
const g1 = f1;
const i1 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: h1 }).toArray();
const j1 = i1;
const k1 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: { a: undefined, b: 0 } }).toArray();
const l1 = k1;
const n1 = Iterator.zipKeyed(m1, { mode: "longest", padding: {} }).toArray();
const o1 = n1;
const q1 = Iterator.zipKeyed({ [p1]: [1] }, { mode: "longest", padding: { [p1]: 0 } }).toArray();
const s1 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: r1 }).toArray();
const t1 = s1;
const u1 = s1;
const w1 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: v1 }).toArray();
const x1 = w1;
const y1 = w1;
const z1 = Iterator.zip([[1], [2]], { mode: "longest", padding: [undefined, 0] }).toArray();
const a2 = k1;


//// [iteratorZipPadding.d.ts]
declare const a: [Iterable<number>, ...Iterable<number>[]];
declare const b: [number, ...(number | undefined)[]][];
declare const c: (number | undefined)[][];
declare const d: number[][];
declare const e: Record<string, Iterable<number>>;
declare const f: {
    [x: string]: number | undefined;
}[];
declare const g: Record<string, number | undefined>[];
declare const h: Record<string, number>[];
declare const i: Record<string, number>;
declare const j: {
    a: number | undefined;
    b: number | undefined;
}[];
declare const k: {
    a: number | undefined;
    b: number | undefined;
}[];
declare const l: {
    a: number;
    b: number;
}[];
declare const m: [number, string][];
declare const n: [number, string][];
declare const o: {
    a: number;
    b: string;
}[];
declare const p: {
    a: number;
    b: string;
}[];
declare const q: [number, string | undefined][];
declare const r: [number | undefined, string | undefined][];
declare const s: [number, string][];
declare const t: {
    a: number;
    b: string | undefined;
}[];
declare const u: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const v: {
    a: number;
    b: string;
}[];
declare const w: readonly [number, string];
declare const x: [number, string][];
declare const y: [number, string?];
declare const z: [number, string | undefined][];
declare const a1: [number, string][];
declare const b1: [Iterable<number>] | [Iterable<number>, Iterable<number>];
declare const c1: ([number] | [number, number | undefined])[];
declare const d1: number[][];
declare const e1: {
    a: Iterable<number>;
} | {
    b: Iterable<string>;
};
declare const f1: ({
    a: number;
} | {
    b: string | undefined;
})[];
declare const g1: ({
    a: number;
} | {
    b: string;
})[];
declare const h1: {
    a: number;
} | {
    b: string;
};
declare const i1: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const j1: {
    a: number;
    b: string;
}[];
declare const k1: {
    a: number | undefined;
    b: number;
}[];
declare const l1: {
    a: number;
    b: number;
}[];
declare const m1: {
    [K in `a${string}`]: Iterable<number>;
};
declare const n1: {
    [x: `a${string}`]: number | undefined;
}[];
declare const o1: {
    [K in `a${string}`]: number;
}[];
declare const p1: unique symbol;
declare const q1: {
    [p1]: number;
}[];
declare const r1: Record<string, number> & {
    a: number;
};
declare const s1: {
    a: number;
    b: number | undefined;
}[];
declare const t1: {
    a: number;
    b: number | undefined;
}[];
declare const u1: {
    a: number;
    b: number;
}[];
declare const v1: [number] | [number, string];
declare const w1: [number, string | undefined][];
declare const x1: [number, string | undefined][];
declare const y1: [number, string][];
declare const z1: [number | undefined, number][];
declare const a2: {
    a: number | undefined;
    b: number;
}[];
