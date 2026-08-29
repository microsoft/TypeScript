//// [tests/cases/compiler/iteratorZip.ts] ////

//// [iteratorZip.ts]
declare const key: unique symbol;

const tuples: [number, string][] = Iterator.zip([
    [1, 2],
    new Set(["a", "b"]),
] as const).toArray();

tuples[0][0] = 2;

Iterator.zip([[1], ["a"]] as const, { mode: "shortest" });
Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [1] });
Iterator.zip([[1], ["a"]] as const, { mode: "strict" });

const empty: never[] = Iterator.zip([]).toArray();

declare const iterables: Iterable<Iterable<number>>;
const arrays: number[][] = Iterator.zip(iterables).toArray();

const objects: { a: number; b: string; [key]: boolean; }[] = Iterator.zipKeyed({
    a: [1, 2],
    b: new Set(["a", "b"]),
    [key]: [true, false],
} as const).toArray();

objects[0].a = 2;

Iterator.zipKeyed({ a: [1], b: ["a"] } as const, {
    mode: "longest",
    padding: { b: "a" },
});

interface Inputs {
    a: Iterable<number>;
    b: Iterator<string>;
}

declare const inputs: Inputs;
const rows: { a: number; b: string; }[] = Iterator.zipKeyed(inputs).toArray();

// @ts-expect-error invalid mode
Iterator.zip([[1]], { mode: "invalid" });

// @ts-expect-error padding values must match the input element types
Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [true] });

// @ts-expect-error padding is only used in longest mode
Iterator.zip([[1]], { mode: "shortest", padding: [1] });

// @ts-expect-error the input must be iterable
Iterator.zip(0);

// @ts-expect-error each keyed value must be iterable
Iterator.zipKeyed({ a: 0 });


//// [iteratorZip.js]
"use strict";
const tuples = Iterator.zip([
    [1, 2],
    new Set(["a", "b"]),
]).toArray();
tuples[0][0] = 2;
Iterator.zip([[1], ["a"]], { mode: "shortest" });
Iterator.zip([[1], ["a"]], { mode: "longest", padding: [1] });
Iterator.zip([[1], ["a"]], { mode: "strict" });
const empty = Iterator.zip([]).toArray();
const arrays = Iterator.zip(iterables).toArray();
const objects = Iterator.zipKeyed({
    a: [1, 2],
    b: new Set(["a", "b"]),
    [key]: [true, false],
}).toArray();
objects[0].a = 2;
Iterator.zipKeyed({ a: [1], b: ["a"] }, {
    mode: "longest",
    padding: { b: "a" },
});
const rows = Iterator.zipKeyed(inputs).toArray();
// @ts-expect-error invalid mode
Iterator.zip([[1]], { mode: "invalid" });
// @ts-expect-error padding values must match the input element types
Iterator.zip([[1], ["a"]], { mode: "longest", padding: [true] });
// @ts-expect-error padding is only used in longest mode
Iterator.zip([[1]], { mode: "shortest", padding: [1] });
// @ts-expect-error the input must be iterable
Iterator.zip(0);
// @ts-expect-error each keyed value must be iterable
Iterator.zipKeyed({ a: 0 });
