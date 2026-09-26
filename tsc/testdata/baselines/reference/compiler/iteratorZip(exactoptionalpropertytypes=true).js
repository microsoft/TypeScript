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

const emptyKeyed: never[] = Iterator.zipKeyed({}).toArray();
const emptyKeyedLongest: never[] = Iterator.zipKeyed({}, { mode: "longest", padding: {} }).toArray();

declare const unionInputs: { a: Iterable<number>; } | { b: Iterator<string>; };
const unionRows: ({ a: number; } | { b: string; })[] = Iterator.zipKeyed(unionInputs).toArray();

// Inputs

Iterator.zip("ab");
Iterator.zip(["ab"]);
Iterator.zip(new Set(["ab"]));
Iterator.zipKeyed("ab");
Iterator.zipKeyed({ a: "ab" });
Iterator.zip([], { mode: "longest", padding: "ab" });
Iterator.zip([["a"]], { mode: "longest", padding: "ab" });
Iterator.zipKeyed({}, { mode: "longest", padding: "ab" });

const a: [string][] = Iterator.zip([new String("ab")]).toArray();
const b: { a: string; }[] = Iterator.zipKeyed({ a: new String("ab") }).toArray();
const c: (string | undefined)[][] = Iterator.zip([["a"]], { mode: "longest", padding: new String("ab") }).toArray();

const d = Iterator.zipKeyed({ a: [1], b: undefined }).toArray();
const e: { a: number; }[] = d;
d[0].b;
const f: never[] = Iterator.zipKeyed({ a: undefined }).toArray();
const g: never[] = Iterator.zipKeyed({ a: undefined }, { mode: "longest", padding: {} }).toArray();

interface I {
    readonly a: Iterable<number>;
    readonly b?: Iterator<string>;
    readonly c: Iterable<boolean> | undefined;
    readonly d?: undefined;
}
declare const h: I;
const i = Iterator.zipKeyed(h).toArray();
const j: { a: number; b?: string; c?: boolean; }[] = i;
i[0].a = 2;
i[0].b = "a";
i[0].c = true;
i[0].d;
const k: { a: number; c: boolean; }[] = i;
const l: { a: number | undefined; b?: string | undefined; c?: boolean | undefined; }[] = Iterator.zipKeyed(h, { mode: "longest" }).toArray();

declare const m: { a: Iterable<number>; } | { b: Iterator<string>; };
const n: ({ a: number; } | { b: string; })[] = Iterator.zipKeyed(m).toArray();
declare const o: { a: Iterable<number>; } | { b: number; };
Iterator.zipKeyed(o);
Iterator.zipKeyed(o, { mode: "longest" });
Iterator.zipKeyed(o, { mode: "longest", padding: {} });
declare const p: { a?: Iterable<number>; } | { b: string; };
Iterator.zipKeyed(p);
declare const q: { a: Iterable<number>; } | { b: undefined; };
const r: { a: number; }[] = Iterator.zipKeyed(q).toArray();

declare const s: unique symbol;
declare const t: { a: Iterable<number>; [s]?: Iterable<string>; };
const u: { a: number; [s]?: string; }[] = Iterator.zipKeyed(t).toArray();

Iterator.zipKeyed({ a: [1], b: null });
Iterator.zipKeyed({ a: [1], b: false });
Iterator.zip([undefined]);

declare const v: { a?: undefined; };
const w: never[] = Iterator.zipKeyed(v).toArray();
const x: { a: number; }[] = Iterator.zipKeyed({ a: [1], b: undefined }, { mode: "longest", padding: { a: 0 } }).toArray();
const y: { a: number | undefined; }[] = Iterator.zipKeyed({ a: [1], b: undefined }, { mode: "longest" }).toArray();

function f1<T>(a: Iterable<T>) {
    const b: { a: T; }[] = Iterator.zipKeyed({ a }).toArray();
    const c: [T][] = Iterator.zip([a]).toArray();
    return { b, c };
}

// Padding

const paddingA: [Iterable<number>, ...Iterable<number>[]] = [[1, 2], [3]];
const paddingB = Iterator.zip(paddingA, { mode: "longest", padding: [0] }).toArray();
const paddingC: (number | undefined)[][] = paddingB;
const paddingD: number[][] = paddingB;

const paddingE: Record<string, Iterable<number>> = { a: [1], b: [2, 3] };
const paddingF = Iterator.zipKeyed(paddingE, { mode: "longest", padding: {} }).toArray();
const paddingG: Record<string, number | undefined>[] = paddingF;
const paddingH: Record<string, number>[] = paddingF;

declare const paddingI: Record<string, number>;
const paddingJ = Iterator.zipKeyed({ a: [1], b: [2, 3] }, { mode: "longest", padding: paddingI }).toArray();
const paddingK: { a: number | undefined; b: number | undefined; }[] = paddingJ;
const paddingL: { a: number; b: number; }[] = paddingJ;

const paddingM = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0, ""] }).toArray();
const paddingN: [number, string][] = paddingM;
const paddingO = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0, b: "" } }).toArray();
const paddingP: { a: number; b: string; }[] = paddingO;

const paddingQ = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0] }).toArray();
const paddingR: [number | undefined, string | undefined][] = paddingQ;
const paddingS: [number, string][] = paddingQ;
const paddingT = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0 } }).toArray();
const paddingU: { a: number | undefined; b: string | undefined; }[] = paddingT;
const paddingV: { a: number; b: string; }[] = paddingT;

declare const paddingW: readonly [number, string];
const paddingX: [number, string][] = Iterator.zip([[1], ["a"]], { mode: "longest", padding: paddingW }).toArray();
declare const paddingY: [number, string?];
const paddingZ = Iterator.zip([[1], ["a"]], { mode: "longest", padding: paddingY }).toArray();
const paddingA1: [number, string][] = paddingZ;

declare const paddingB1: [Iterable<number>] | [Iterable<number>, Iterable<number>];
const paddingC1 = Iterator.zip(paddingB1, { mode: "longest", padding: [0] }).toArray();
const paddingD1: number[][] = paddingC1;
declare const paddingE1: { a: Iterable<number>; } | { b: Iterable<string>; };
const paddingF1 = Iterator.zipKeyed(paddingE1, { mode: "longest", padding: { a: 0 } }).toArray();
const paddingG1: ({ a: number; } | { b: string; })[] = paddingF1;

declare const paddingH1: { a: number; } | { b: string; };
const paddingI1 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: paddingH1 }).toArray();
const paddingJ1: { a: number; b: string; }[] = paddingI1;

const paddingK1 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: { a: undefined, b: 0 } }).toArray();
const paddingL1: { a: number; b: number; }[] = paddingK1;

declare const paddingM1: { [K in `a${string}`]: Iterable<number>; };
const paddingN1 = Iterator.zipKeyed(paddingM1, { mode: "longest", padding: {} }).toArray();
const paddingO1: { [K in `a${string}`]: number; }[] = paddingN1;

declare const paddingP1: unique symbol;
const paddingQ1: { [paddingP1]: number; }[] = Iterator.zipKeyed({ [paddingP1]: [1] }, { mode: "longest", padding: { [paddingP1]: 0 } }).toArray();

declare const paddingR1: Record<string, number> & { a: number; };
const paddingS1 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: paddingR1 }).toArray();
const paddingT1: { a: number; b: number | undefined; }[] = paddingS1;
const paddingU1: { a: number; b: number; }[] = paddingS1;

declare const paddingV1: [number] | [number, string];
const paddingW1 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: paddingV1 }).toArray();
const paddingX1: [number, string | undefined][] = paddingW1;
const paddingY1: [number, string][] = paddingW1;

const paddingZ1: [number | undefined, number][] = Iterator.zip([[1], [2]], { mode: "longest", padding: [undefined, 0] }).toArray();
const paddingA2: { a: number | undefined; b: number; }[] = paddingK1;

// Own properties

class InputsWithPrototypeMembers {
    values = [1, 2];

    get label() {
        return "inputs";
    }

    describe() {
        return this.label;
    }
}

const instance = new InputsWithPrototypeMembers();
const inherited = Iterator.zipKeyed(instance).toArray();
const inheritedStrict = Iterator.zipKeyed(instance, { mode: "strict" }).toArray();
const inheritedLongest = Iterator.zipKeyed(instance, { mode: "longest" }).toArray();
const inheritedPadded = Iterator.zipKeyed(instance, { mode: "longest", padding: { values: 0 } }).toArray();

const hiddenInputs = { values: [1, 2], label: "inputs" };
Object.defineProperty(hiddenInputs, "label", { enumerable: false });
const nonEnumerable = Iterator.zipKeyed(hiddenInputs).toArray();
const nonEnumerablePadded = Iterator.zipKeyed(hiddenInputs, { mode: "longest", padding: { values: 0 } }).toArray();

// The same static shape can have an enumerable non-iterator property instead.
// Such inputs are accepted by the fallback and checked at runtime.
const enumerableInputs = { values: [1, 2], label: "inputs" };
const enumerable = Iterator.zipKeyed(enumerableInputs).toArray();

// The array's length and methods are not enumerable own properties.
const arrayInputs = Iterator.zipKeyed([[1, 2], ["a", "b"]]).toArray();

// The fallback must not claim that ignored properties exist on yielded objects.
const inheritedLabel: string = inherited[0].label;
const nonEnumerableLabel: string = nonEnumerable[0].label;

// Precise record inference still handles symbol keys and padding.
declare const ownKey: unique symbol;
const precise: { values: number; [ownKey]: string; }[] = Iterator.zipKeyed({ values: [1], [ownKey]: ["a"] }).toArray();
const preciseLongest: { values: number | undefined; }[] = Iterator.zipKeyed({ values: [1] }, { mode: "longest" }).toArray();
const precisePadded: { values: number; }[] = Iterator.zipKeyed({ values: [1] }, { mode: "longest", padding: { values: 0 } }).toArray();
const emptyOwnProperties: never[] = Iterator.zipKeyed({}).toArray();

Iterator.zipKeyed(0);
Iterator.zipKeyed(null);
Iterator.zipKeyed(instance, { mode: "invalid" });
Iterator.zipKeyed(instance, { mode: "shortest", padding: {} });
Iterator.zipKeyed(instance, { mode: "longest", padding: 0 });
Iterator.zipKeyed({ values: [1] }, { mode: "longest", padding: { values: "invalid" } });


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
const emptyKeyed = Iterator.zipKeyed({}).toArray();
const emptyKeyedLongest = Iterator.zipKeyed({}, { mode: "longest", padding: {} }).toArray();
const unionRows = Iterator.zipKeyed(unionInputs).toArray();
// Inputs
Iterator.zip("ab");
Iterator.zip(["ab"]);
Iterator.zip(new Set(["ab"]));
Iterator.zipKeyed("ab");
Iterator.zipKeyed({ a: "ab" });
Iterator.zip([], { mode: "longest", padding: "ab" });
Iterator.zip([["a"]], { mode: "longest", padding: "ab" });
Iterator.zipKeyed({}, { mode: "longest", padding: "ab" });
const a = Iterator.zip([new String("ab")]).toArray();
const b = Iterator.zipKeyed({ a: new String("ab") }).toArray();
const c = Iterator.zip([["a"]], { mode: "longest", padding: new String("ab") }).toArray();
const d = Iterator.zipKeyed({ a: [1], b: undefined }).toArray();
const e = d;
d[0].b;
const f = Iterator.zipKeyed({ a: undefined }).toArray();
const g = Iterator.zipKeyed({ a: undefined }, { mode: "longest", padding: {} }).toArray();
const i = Iterator.zipKeyed(h).toArray();
const j = i;
i[0].a = 2;
i[0].b = "a";
i[0].c = true;
i[0].d;
const k = i;
const l = Iterator.zipKeyed(h, { mode: "longest" }).toArray();
const n = Iterator.zipKeyed(m).toArray();
Iterator.zipKeyed(o);
Iterator.zipKeyed(o, { mode: "longest" });
Iterator.zipKeyed(o, { mode: "longest", padding: {} });
Iterator.zipKeyed(p);
const r = Iterator.zipKeyed(q).toArray();
const u = Iterator.zipKeyed(t).toArray();
Iterator.zipKeyed({ a: [1], b: null });
Iterator.zipKeyed({ a: [1], b: false });
Iterator.zip([undefined]);
const w = Iterator.zipKeyed(v).toArray();
const x = Iterator.zipKeyed({ a: [1], b: undefined }, { mode: "longest", padding: { a: 0 } }).toArray();
const y = Iterator.zipKeyed({ a: [1], b: undefined }, { mode: "longest" }).toArray();
function f1(a) {
    const b = Iterator.zipKeyed({ a }).toArray();
    const c = Iterator.zip([a]).toArray();
    return { b, c };
}
// Padding
const paddingA = [[1, 2], [3]];
const paddingB = Iterator.zip(paddingA, { mode: "longest", padding: [0] }).toArray();
const paddingC = paddingB;
const paddingD = paddingB;
const paddingE = { a: [1], b: [2, 3] };
const paddingF = Iterator.zipKeyed(paddingE, { mode: "longest", padding: {} }).toArray();
const paddingG = paddingF;
const paddingH = paddingF;
const paddingJ = Iterator.zipKeyed({ a: [1], b: [2, 3] }, { mode: "longest", padding: paddingI }).toArray();
const paddingK = paddingJ;
const paddingL = paddingJ;
const paddingM = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0, ""] }).toArray();
const paddingN = paddingM;
const paddingO = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0, b: "" } }).toArray();
const paddingP = paddingO;
const paddingQ = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0] }).toArray();
const paddingR = paddingQ;
const paddingS = paddingQ;
const paddingT = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0 } }).toArray();
const paddingU = paddingT;
const paddingV = paddingT;
const paddingX = Iterator.zip([[1], ["a"]], { mode: "longest", padding: paddingW }).toArray();
const paddingZ = Iterator.zip([[1], ["a"]], { mode: "longest", padding: paddingY }).toArray();
const paddingA1 = paddingZ;
const paddingC1 = Iterator.zip(paddingB1, { mode: "longest", padding: [0] }).toArray();
const paddingD1 = paddingC1;
const paddingF1 = Iterator.zipKeyed(paddingE1, { mode: "longest", padding: { a: 0 } }).toArray();
const paddingG1 = paddingF1;
const paddingI1 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: paddingH1 }).toArray();
const paddingJ1 = paddingI1;
const paddingK1 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: { a: undefined, b: 0 } }).toArray();
const paddingL1 = paddingK1;
const paddingN1 = Iterator.zipKeyed(paddingM1, { mode: "longest", padding: {} }).toArray();
const paddingO1 = paddingN1;
const paddingQ1 = Iterator.zipKeyed({ [paddingP1]: [1] }, { mode: "longest", padding: { [paddingP1]: 0 } }).toArray();
const paddingS1 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: paddingR1 }).toArray();
const paddingT1 = paddingS1;
const paddingU1 = paddingS1;
const paddingW1 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: paddingV1 }).toArray();
const paddingX1 = paddingW1;
const paddingY1 = paddingW1;
const paddingZ1 = Iterator.zip([[1], [2]], { mode: "longest", padding: [undefined, 0] }).toArray();
const paddingA2 = paddingK1;
// Own properties
class InputsWithPrototypeMembers {
    values = [1, 2];
    get label() {
        return "inputs";
    }
    describe() {
        return this.label;
    }
}
const instance = new InputsWithPrototypeMembers();
const inherited = Iterator.zipKeyed(instance).toArray();
const inheritedStrict = Iterator.zipKeyed(instance, { mode: "strict" }).toArray();
const inheritedLongest = Iterator.zipKeyed(instance, { mode: "longest" }).toArray();
const inheritedPadded = Iterator.zipKeyed(instance, { mode: "longest", padding: { values: 0 } }).toArray();
const hiddenInputs = { values: [1, 2], label: "inputs" };
Object.defineProperty(hiddenInputs, "label", { enumerable: false });
const nonEnumerable = Iterator.zipKeyed(hiddenInputs).toArray();
const nonEnumerablePadded = Iterator.zipKeyed(hiddenInputs, { mode: "longest", padding: { values: 0 } }).toArray();
// The same static shape can have an enumerable non-iterator property instead.
// Such inputs are accepted by the fallback and checked at runtime.
const enumerableInputs = { values: [1, 2], label: "inputs" };
const enumerable = Iterator.zipKeyed(enumerableInputs).toArray();
// The array's length and methods are not enumerable own properties.
const arrayInputs = Iterator.zipKeyed([[1, 2], ["a", "b"]]).toArray();
// The fallback must not claim that ignored properties exist on yielded objects.
const inheritedLabel = inherited[0].label;
const nonEnumerableLabel = nonEnumerable[0].label;
const precise = Iterator.zipKeyed({ values: [1], [ownKey]: ["a"] }).toArray();
const preciseLongest = Iterator.zipKeyed({ values: [1] }, { mode: "longest" }).toArray();
const precisePadded = Iterator.zipKeyed({ values: [1] }, { mode: "longest", padding: { values: 0 } }).toArray();
const emptyOwnProperties = Iterator.zipKeyed({}).toArray();
Iterator.zipKeyed(0);
Iterator.zipKeyed(null);
Iterator.zipKeyed(instance, { mode: "invalid" });
Iterator.zipKeyed(instance, { mode: "shortest", padding: {} });
Iterator.zipKeyed(instance, { mode: "longest", padding: 0 });
Iterator.zipKeyed({ values: [1] }, { mode: "longest", padding: { values: "invalid" } });


//// [iteratorZip.d.ts]
declare const key: unique symbol;
declare const tuples: [number, string][];
declare const shortestTuples: [number, string][];
declare const strictTuples: [number, string][];
declare const longestTuplesWithPadding: [number, string][];
declare const longestTuplesWithoutPadding: [number | undefined, string | undefined][];
declare const longestTuplesWithPartialPadding: [number | undefined, string | undefined][];
declare const maybeLongestOptions: {
    mode: "shortest";
} | {
    mode: "longest";
};
declare const maybeLongestTuples: [number | undefined, string | undefined][];
declare const empty: never[];
declare const emptyLongest: never[];
declare const iterables: Iterable<Iterable<number>>;
declare const arrays: number[][];
declare const longestArrays: (number | undefined)[][];
declare const maybeLongestArrays: (number | undefined)[][];
declare const iterableArray: Iterable<number>[];
declare const longestArrayWithPadding: (number | undefined)[][];
declare const objects: {
    a: number;
    b: string;
    [key]: boolean;
}[];
declare const longestObjectsWithPadding: {
    a: number;
    b: string;
}[];
declare const longestObjectsWithoutPadding: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const longestObjectsWithPartialPadding: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const maybeLongestObjects: {
    a: number | undefined;
    b: string | undefined;
}[];
interface Inputs {
    a: Iterable<number>;
    b: Iterator<string>;
}
declare const inputs: Inputs;
declare const rows: {
    a: number;
    b: string;
}[];
declare const emptyKeyed: never[];
declare const emptyKeyedLongest: never[];
declare const unionInputs: {
    a: Iterable<number>;
} | {
    b: Iterator<string>;
};
declare const unionRows: ({
    a: number;
} | {
    b: string;
})[];
declare const a: [string][];
declare const b: {
    a: string;
}[];
declare const c: (string | undefined)[][];
declare const d: {
    a: number;
}[];
declare const e: {
    a: number;
}[];
declare const f: never[];
declare const g: never[];
interface I {
    readonly a: Iterable<number>;
    readonly b?: Iterator<string>;
    readonly c: Iterable<boolean> | undefined;
    readonly d?: undefined;
}
declare const h: I;
declare const i: {
    a: number;
    b?: string;
    c?: boolean;
}[];
declare const j: {
    a: number;
    b?: string;
    c?: boolean;
}[];
declare const k: {
    a: number;
    c: boolean;
}[];
declare const l: {
    a: number | undefined;
    b?: string | undefined;
    c?: boolean | undefined;
}[];
declare const m: {
    a: Iterable<number>;
} | {
    b: Iterator<string>;
};
declare const n: ({
    a: number;
} | {
    b: string;
})[];
declare const o: {
    a: Iterable<number>;
} | {
    b: number;
};
declare const p: {
    a?: Iterable<number>;
} | {
    b: string;
};
declare const q: {
    a: Iterable<number>;
} | {
    b: undefined;
};
declare const r: {
    a: number;
}[];
declare const s: unique symbol;
declare const t: {
    a: Iterable<number>;
    [s]?: Iterable<string>;
};
declare const u: {
    a: number;
    [s]?: string;
}[];
declare const v: {
    a?: undefined;
};
declare const w: never[];
declare const x: {
    a: number;
}[];
declare const y: {
    a: number | undefined;
}[];
declare function f1<T>(a: Iterable<T>): {
    b: {
        a: T;
    }[];
    c: [T][];
};
declare const paddingA: [Iterable<number>, ...Iterable<number>[]];
declare const paddingB: [number, ...(number | undefined)[]][];
declare const paddingC: (number | undefined)[][];
declare const paddingD: number[][];
declare const paddingE: Record<string, Iterable<number>>;
declare const paddingF: {
    [x: string]: number | undefined;
}[];
declare const paddingG: Record<string, number | undefined>[];
declare const paddingH: Record<string, number>[];
declare const paddingI: Record<string, number>;
declare const paddingJ: {
    a: number | undefined;
    b: number | undefined;
}[];
declare const paddingK: {
    a: number | undefined;
    b: number | undefined;
}[];
declare const paddingL: {
    a: number;
    b: number;
}[];
declare const paddingM: [number, string][];
declare const paddingN: [number, string][];
declare const paddingO: {
    a: number;
    b: string;
}[];
declare const paddingP: {
    a: number;
    b: string;
}[];
declare const paddingQ: [number, string | undefined][];
declare const paddingR: [number | undefined, string | undefined][];
declare const paddingS: [number, string][];
declare const paddingT: {
    a: number;
    b: string | undefined;
}[];
declare const paddingU: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const paddingV: {
    a: number;
    b: string;
}[];
declare const paddingW: readonly [number, string];
declare const paddingX: [number, string][];
declare const paddingY: [number, string?];
declare const paddingZ: [number, string | undefined][];
declare const paddingA1: [number, string][];
declare const paddingB1: [Iterable<number>] | [Iterable<number>, Iterable<number>];
declare const paddingC1: ([number] | [number, number | undefined])[];
declare const paddingD1: number[][];
declare const paddingE1: {
    a: Iterable<number>;
} | {
    b: Iterable<string>;
};
declare const paddingF1: ({
    a: number;
} | {
    b: string | undefined;
})[];
declare const paddingG1: ({
    a: number;
} | {
    b: string;
})[];
declare const paddingH1: {
    a: number;
} | {
    b: string;
};
declare const paddingI1: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const paddingJ1: {
    a: number;
    b: string;
}[];
declare const paddingK1: {
    a: number | undefined;
    b: number;
}[];
declare const paddingL1: {
    a: number;
    b: number;
}[];
declare const paddingM1: {
    [K in `a${string}`]: Iterable<number>;
};
declare const paddingN1: {
    [x: `a${string}`]: number | undefined;
}[];
declare const paddingO1: {
    [K in `a${string}`]: number;
}[];
declare const paddingP1: unique symbol;
declare const paddingQ1: {
    [paddingP1]: number;
}[];
declare const paddingR1: Record<string, number> & {
    a: number;
};
declare const paddingS1: {
    a: number;
    b: number | undefined;
}[];
declare const paddingT1: {
    a: number;
    b: number | undefined;
}[];
declare const paddingU1: {
    a: number;
    b: number;
}[];
declare const paddingV1: [number] | [number, string];
declare const paddingW1: [number, string | undefined][];
declare const paddingX1: [number, string | undefined][];
declare const paddingY1: [number, string][];
declare const paddingZ1: [number | undefined, number][];
declare const paddingA2: {
    a: number | undefined;
    b: number;
}[];
declare class InputsWithPrototypeMembers {
    values: number[];
    get label(): string;
    describe(): string;
}
declare const instance: InputsWithPrototypeMembers;
declare const inherited: Record<PropertyKey, unknown>[];
declare const inheritedStrict: Record<PropertyKey, unknown>[];
declare const inheritedLongest: Record<PropertyKey, unknown>[];
declare const inheritedPadded: Record<PropertyKey, unknown>[];
declare const hiddenInputs: {
    values: number[];
    label: string;
};
declare const nonEnumerable: Record<PropertyKey, unknown>[];
declare const nonEnumerablePadded: Record<PropertyKey, unknown>[];
declare const enumerableInputs: {
    values: number[];
    label: string;
};
declare const enumerable: Record<PropertyKey, unknown>[];
declare const arrayInputs: Record<PropertyKey, unknown>[];
declare const inheritedLabel: string;
declare const nonEnumerableLabel: string;
declare const ownKey: unique symbol;
declare const precise: {
    values: number;
    [ownKey]: string;
}[];
declare const preciseLongest: {
    values: number | undefined;
}[];
declare const precisePadded: {
    values: number;
}[];
declare const emptyOwnProperties: never[];
