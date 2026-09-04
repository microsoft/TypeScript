// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true

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

const emptyKeyed: never[] = Iterator.zipKeyed({}).toArray();
const emptyKeyedLongest: never[] = Iterator.zipKeyed({}, { mode: "longest", padding: {} }).toArray();

declare const unionInputs: { a: Iterable<number>; } | { b: Iterator<string>; };
const unionRows: ({ a: number; } | { b: string; })[] = Iterator.zipKeyed(unionInputs).toArray();
