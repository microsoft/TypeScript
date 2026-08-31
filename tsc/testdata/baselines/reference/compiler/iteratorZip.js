//// [tests/cases/compiler/iteratorZip.ts] ////

//// [iteratorZip.ts]
declare const key: unique symbol;

const tuples: [number, string][] = Iterator.zip([
    [1, 2],
    new Set(["a", "b"]),
] as const).toArray();

tuples[0][0] = 2;

const shortestTuples: [number, string][] = Iterator.zip([[1], ["a"]] as const, { mode: "shortest" }).toArray();
const strictTuples: [number, string][] = Iterator.zip([[1], ["a"]] as const, { mode: "strict" }).toArray();
const longestTuplesWithPadding: [number, string][] = Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [1, "a"] }).toArray();
const longestTuplesWithoutPadding: [number | undefined, string | undefined][] = Iterator.zip([[1], ["a"]] as const, { mode: "longest" }).toArray();
const longestTuplesWithPartialPadding: [number | undefined, string | undefined][] = Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [1] }).toArray();

declare const maybeLongestOptions: { mode: "shortest"; } | { mode: "longest"; };
const maybeLongestTuples: [number | undefined, string | undefined][] = Iterator.zip([[1], ["a"]] as const, maybeLongestOptions).toArray();

const empty: never[] = Iterator.zip([]).toArray();
const emptyLongest: never[] = Iterator.zip([], { mode: "longest" }).toArray();

declare const iterables: Iterable<Iterable<number>>;
const arrays: number[][] = Iterator.zip(iterables).toArray();
const longestArrays: (number | undefined)[][] = Iterator.zip(iterables, { mode: "longest" }).toArray();
const maybeLongestArrays: (number | undefined)[][] = Iterator.zip(iterables, maybeLongestOptions).toArray();

declare const iterableArray: Iterable<number>[];
const longestArrayWithPadding: (number | undefined)[][] = Iterator.zip(iterableArray, { mode: "longest", padding: [] }).toArray();

const objects: { a: number; b: string; [key]: boolean; }[] = Iterator.zipKeyed({
    a: [1, 2],
    b: new Set(["a", "b"]),
    [key]: [true, false],
} as const).toArray();

objects[0].a = 2;

const longestObjectsWithPadding: { a: number; b: string; }[] = Iterator.zipKeyed({ a: [1], b: ["a"] } as const, {
    mode: "longest",
    padding: { a: 1, b: "a" },
}).toArray();

const longestObjectsWithoutPadding: { a: number | undefined; b: string | undefined; }[] = Iterator.zipKeyed({ a: [1], b: ["a"] } as const, {
    mode: "longest",
}).toArray();

const longestObjectsWithPartialPadding: { a: number | undefined; b: string | undefined; }[] = Iterator.zipKeyed({ a: [1], b: ["a"] } as const, {
    mode: "longest",
    padding: { b: "a" },
}).toArray();

const maybeLongestObjects: { a: number | undefined; b: string | undefined; }[] = Iterator.zipKeyed({ a: [1], b: ["a"] } as const, maybeLongestOptions).toArray();

interface Inputs {
    a: Iterable<number>;
    b: Iterator<string>;
}

declare const inputs: Inputs;
const rows: { a: number; b: string; }[] = Iterator.zipKeyed(inputs).toArray();

Iterator.zip([[1]], { mode: "invalid" });

Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [true] });

Iterator.zip([[1]], { mode: "shortest", padding: [1] });

Iterator.zip(0);

Iterator.zipKeyed({ a: 0 });


//// [iteratorZip.js]
"use strict";
const tuples = Iterator.zip([
    [1, 2],
    new Set(["a", "b"]),
]).toArray();
tuples[0][0] = 2;
const shortestTuples = Iterator.zip([[1], ["a"]], { mode: "shortest" }).toArray();
const strictTuples = Iterator.zip([[1], ["a"]], { mode: "strict" }).toArray();
const longestTuplesWithPadding = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [1, "a"] }).toArray();
const longestTuplesWithoutPadding = Iterator.zip([[1], ["a"]], { mode: "longest" }).toArray();
const longestTuplesWithPartialPadding = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [1] }).toArray();
const maybeLongestTuples = Iterator.zip([[1], ["a"]], maybeLongestOptions).toArray();
const empty = Iterator.zip([]).toArray();
const emptyLongest = Iterator.zip([], { mode: "longest" }).toArray();
const arrays = Iterator.zip(iterables).toArray();
const longestArrays = Iterator.zip(iterables, { mode: "longest" }).toArray();
const maybeLongestArrays = Iterator.zip(iterables, maybeLongestOptions).toArray();
const longestArrayWithPadding = Iterator.zip(iterableArray, { mode: "longest", padding: [] }).toArray();
const objects = Iterator.zipKeyed({
    a: [1, 2],
    b: new Set(["a", "b"]),
    [key]: [true, false],
}).toArray();
objects[0].a = 2;
const longestObjectsWithPadding = Iterator.zipKeyed({ a: [1], b: ["a"] }, {
    mode: "longest",
    padding: { a: 1, b: "a" },
}).toArray();
const longestObjectsWithoutPadding = Iterator.zipKeyed({ a: [1], b: ["a"] }, {
    mode: "longest",
}).toArray();
const longestObjectsWithPartialPadding = Iterator.zipKeyed({ a: [1], b: ["a"] }, {
    mode: "longest",
    padding: { b: "a" },
}).toArray();
const maybeLongestObjects = Iterator.zipKeyed({ a: [1], b: ["a"] }, maybeLongestOptions).toArray();
const rows = Iterator.zipKeyed(inputs).toArray();
Iterator.zip([[1]], { mode: "invalid" });
Iterator.zip([[1], ["a"]], { mode: "longest", padding: [true] });
Iterator.zip([[1]], { mode: "shortest", padding: [1] });
Iterator.zip(0);
Iterator.zipKeyed({ a: 0 });
