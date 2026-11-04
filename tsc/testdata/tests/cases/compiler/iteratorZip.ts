// @target: esnext
// @lib: es2015, esnext.iterator
// @strict: true
// @exactOptionalPropertyTypes: true, false
// @declaration: true

// @filename: a.ts

declare const a1: unique symbol;

const a2: [number, string][] = Iterator.zip([
    [1, 2],
    new Set(["a", "b"]),
] as const).toArray();

a2[0][0] = 2;

const a3: [number, string][] = Iterator.zip([[1], ["a"]] as const, { mode: "shortest" }).toArray();
const a4: [number, string][] = Iterator.zip([[1], ["a"]] as const, { mode: "strict" }).toArray();
const a5: [number, string][] = Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [1, "a"] }).toArray();
const a6: [number | undefined, string | undefined][] = Iterator.zip([[1], ["a"]] as const, { mode: "longest" }).toArray();
const a7: [number | undefined, string | undefined][] = Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [1] }).toArray();

declare const a8: { mode: "shortest"; } | { mode: "longest"; };
const a9: [number | undefined, string | undefined][] = Iterator.zip([[1], ["a"]] as const, a8).toArray();

const a10: never[] = Iterator.zip([]).toArray();
const a11: never[] = Iterator.zip([], { mode: "longest" }).toArray();

declare const a12: Iterable<Iterable<number>>;
const a13: number[][] = Iterator.zip(a12).toArray();
const a14: (number | undefined)[][] = Iterator.zip(a12, { mode: "longest" }).toArray();
const a15: (number | undefined)[][] = Iterator.zip(a12, a8).toArray();

declare const a16: Iterable<number>[];
const a17: (number | undefined)[][] = Iterator.zip(a16, { mode: "longest", padding: [] }).toArray();

const a18: { a: number; b: string; [a1]: boolean; }[] = Iterator.zipKeyed({
    a: [1, 2],
    b: new Set(["a", "b"]),
    [a1]: [true, false],
} as const).toArray();

a18[0].a = 2;

const a19: { a: number; b: string; }[] = Iterator.zipKeyed({ a: [1], b: ["a"] } as const, {
    mode: "longest",
    padding: { a: 1, b: "a" },
}).toArray();

const a20: { a: number | undefined; b: string | undefined; }[] = Iterator.zipKeyed({ a: [1], b: ["a"] } as const, {
    mode: "longest",
}).toArray();

const a21: { a: number | undefined; b: string | undefined; }[] = Iterator.zipKeyed({ a: [1], b: ["a"] } as const, {
    mode: "longest",
    padding: { b: "a" },
}).toArray();

const a22: { a: number | undefined; b: string | undefined; }[] = Iterator.zipKeyed({ a: [1], b: ["a"] } as const, a8).toArray();

interface I1 {
    a: Iterable<number>;
    b: Iterator<string>;
}

declare const a23: I1;
const a24: { a: number; b: string; }[] = Iterator.zipKeyed(a23).toArray();

Iterator.zip([[1]], { mode: "invalid" });

Iterator.zip([[1]], { mode: "shortest", padding: [1] });

Iterator.zip(0);

Iterator.zipKeyed({ a: 0 });

const a25: Record<PropertyKey, unknown>[] = Iterator.zipKeyed({}).toArray();
const a26: Record<PropertyKey, unknown>[] = Iterator.zipKeyed({}, { mode: "longest", padding: {} }).toArray();

declare const a27: { a: Iterable<number>; } | { b: Iterator<string>; };
const a28: ({ a: number; } | { b: string; })[] = Iterator.zipKeyed(a27).toArray();

Iterator.zip("ab");
Iterator.zip(["ab"]);
Iterator.zip(new Set(["ab"]));
Iterator.zipKeyed("ab");
Iterator.zipKeyed({ a: "ab" });
Iterator.zip([], { mode: "longest", padding: "ab" });
Iterator.zip([["a"]], { mode: "longest", padding: "ab" });
Iterator.zipKeyed({}, { mode: "longest", padding: "ab" });

const a29: [string][] = Iterator.zip([new String("ab")]).toArray();
const a30: { a: string; }[] = Iterator.zipKeyed({ a: new String("ab") }).toArray();
const a31: (string | undefined)[][] = Iterator.zip([["a"]], { mode: "longest", padding: new String("ab") }).toArray();

const a32 = Iterator.zipKeyed({ a: [1], b: undefined }).toArray();
const a33: { a: number; }[] = a32;
a32[0].b;
const a34: never[] = Iterator.zipKeyed({ a: undefined }).toArray();
const a35: never[] = Iterator.zipKeyed({ a: undefined }, { mode: "longest", padding: {} }).toArray();

interface I2 {
    readonly a: Iterable<number>;
    readonly b?: Iterator<string>;
    readonly c: Iterable<boolean> | undefined;
    readonly d?: undefined;
}
declare const a36: I2;
const a37 = Iterator.zipKeyed(a36).toArray();
const a38: { a: number; b?: string; c?: boolean; }[] = a37;
a37[0].a = 2;
a37[0].b = "a";
a37[0].c = true;
a37[0].d;
const a39: { a: number; c: boolean; }[] = a37;
const a40: { a: number | undefined; b?: string | undefined; c?: boolean | undefined; }[] = Iterator.zipKeyed(a36, { mode: "longest" }).toArray();

declare const a41: { a: Iterable<number>; } | { b: Iterator<string>; };
const a42: ({ a: number; } | { b: string; })[] = Iterator.zipKeyed(a41).toArray();
declare const a43: { a: Iterable<number>; } | { b: number; };
Iterator.zipKeyed(a43);
Iterator.zipKeyed(a43, { mode: "longest" });
Iterator.zipKeyed(a43, { mode: "longest", padding: {} });
declare const a44: { a?: Iterable<number>; } | { b: string; };
Iterator.zipKeyed(a44);
declare const a45: { a: Iterable<number>; } | { b: undefined; };
const a46: { a: number; }[] = Iterator.zipKeyed(a45).toArray();

declare const a47: unique symbol;
declare const a48: { a: Iterable<number>; [a47]?: Iterable<string>; };
const a49: { a: number; [a47]?: string; }[] = Iterator.zipKeyed(a48).toArray();

Iterator.zipKeyed({ a: [1], b: null });
Iterator.zipKeyed({ a: [1], b: false });
Iterator.zip([undefined]);

declare const a50: { a?: undefined; };
const a51: never[] = Iterator.zipKeyed(a50).toArray();
const a52: { a: number; }[] = Iterator.zipKeyed({ a: [1], b: undefined }, { mode: "longest", padding: { a: 0 } }).toArray();
const a53: { a: number | undefined; }[] = Iterator.zipKeyed({ a: [1], b: undefined }, { mode: "longest" }).toArray();

function f1<T>(a: Iterable<T>) {
    const b: { a: T; }[] = Iterator.zipKeyed({ a }).toArray();
    const c: [T][] = Iterator.zip([a]).toArray();
    return { b, c };
}

const a54: [Iterable<number>, ...Iterable<number>[]] = [[1, 2], [3]];
const a55 = Iterator.zip(a54, { mode: "longest", padding: [0] }).toArray();
const a56: (number | undefined)[][] = a55;
const a57: number[][] = a55;

const a58: Record<string, Iterable<number>> = { a: [1], b: [2, 3] };
const a59 = Iterator.zipKeyed(a58, { mode: "longest", padding: {} }).toArray();
const a60: Record<string, number | undefined>[] = a59;
const a61: Record<string, number>[] = a59;

declare const a62: Record<string, number>;
const a63 = Iterator.zipKeyed({ a: [1], b: [2, 3] }, { mode: "longest", padding: a62 }).toArray();
const a64: { a: number | undefined; b: number | undefined; }[] = a63;
const a65: { a: number; b: number; }[] = a63;

const a66 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0, ""] }).toArray();
const a67: [number, string][] = a66;
const a68 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0, b: "" } }).toArray();
const a69: { a: number; b: string; }[] = a68;

const a70 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0] }).toArray();
const a71: [number | undefined, string | undefined][] = a70;
const a72: [number, string][] = a70;
const a73 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0 } }).toArray();
const a74: { a: number | undefined; b: string | undefined; }[] = a73;
const a75: { a: number; b: string; }[] = a73;

declare const a76: readonly [number, string];
const a77: [number, string][] = Iterator.zip([[1], ["a"]], { mode: "longest", padding: a76 }).toArray();
declare const a78: [number, string?];
const a79 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: a78 }).toArray();
const a80: [number, string][] = a79;

declare const a81: [Iterable<number>] | [Iterable<number>, Iterable<number>];
const a82 = Iterator.zip(a81, { mode: "longest", padding: [0] }).toArray();
const a83: number[][] = a82;
declare const a84: { a: Iterable<number>; } | { b: Iterable<string>; };
const a85 = Iterator.zipKeyed(a84, { mode: "longest", padding: { a: 0 } }).toArray();
const a86: ({ a: number; } | { b: string; })[] = a85;

declare const a87: { a: number; } | { b: string; };
const a88 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: a87 }).toArray();
const a89: { a: number; b: string; }[] = a88;

const a90 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: { a: undefined, b: 0 } }).toArray();
const a91: { a: number; b: number; }[] = a90;

declare const a92: { [K in `a${string}`]: Iterable<number>; };
const a93 = Iterator.zipKeyed(a92, { mode: "longest", padding: {} }).toArray();
const a94: { [K in `a${string}`]: number; }[] = a93;

declare const a95: unique symbol;
const a96: { [a95]: number; }[] = Iterator.zipKeyed({ [a95]: [1] }, { mode: "longest", padding: { [a95]: 0 } }).toArray();

declare const a97: Record<string, number> & { a: number; };
const a98 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: a97 }).toArray();
const a99: { a: number; b: number | undefined; }[] = a98;
const a100: { a: number; b: number; }[] = a98;

declare const a101: [number] | [number, string];
const a102 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: a101 }).toArray();
const a103: [number, string | undefined][] = a102;
const a104: [number, string][] = a102;

const a105: [number | undefined, number][] = Iterator.zip([[1], [2]], { mode: "longest", padding: [undefined, 0] }).toArray();
const a106: { a: number | undefined; b: number; }[] = a90;

class C1 {
    a = [1, 2];

    get b() {
        return "inputs";
    }

    f() {
        return this.b;
    }
}

const a107 = new C1();
const a108 = Iterator.zipKeyed(a107).toArray();
const a109 = Iterator.zipKeyed(a107, { mode: "strict" }).toArray();
const a110 = Iterator.zipKeyed(a107, { mode: "longest" }).toArray();
const a111 = Iterator.zipKeyed(a107, { mode: "longest", padding: { a: 0 } }).toArray();

const a112 = { a: [1, 2], b: "inputs" };
Object.defineProperty(a112, "b", { enumerable: false });
const a113 = Iterator.zipKeyed(a112).toArray();
const a114 = Iterator.zipKeyed(a112, { mode: "longest", padding: { a: 0 } }).toArray();

const a115 = { a: [1, 2], b: "inputs" };
const a116 = Iterator.zipKeyed(a115).toArray();

const a117 = Iterator.zipKeyed([[1, 2], ["a", "b"]]).toArray();

const a118: string = a108[0].b;
const a119: string = a113[0].b;

declare const a120: unique symbol;
const a121: { a: number; [a120]: string; }[] = Iterator.zipKeyed({ a: [1], [a120]: ["a"] }).toArray();
const a122: { a: number | undefined; }[] = Iterator.zipKeyed({ a: [1] }, { mode: "longest" }).toArray();
const a123: { a: number; }[] = Iterator.zipKeyed({ a: [1] }, { mode: "longest", padding: { a: 0 } }).toArray();

declare const a124: object;
const a125 = Iterator.zipKeyed(a124).toArray();
const a126 = Iterator.zipKeyed(a124, { mode: "strict" }).toArray();
const a127 = Iterator.zipKeyed(a124, { mode: "longest" }).toArray();
const a128 = Iterator.zipKeyed(a124, { mode: "longest", padding: { a: 0 } }).toArray();
const a129: unknown = a125[0].a;
const a130: unknown = a126[0].a;
const a131: unknown = a127[0].a;
const a132: unknown = a128[0].a;
const a133: never[] = a125;

declare const a134: {};
const a135 = Iterator.zipKeyed(a134).toArray();
const a136: unknown = a135[0].a;
const a137: never[] = a135;

Iterator.zipKeyed(0);
Iterator.zipKeyed(null);
Iterator.zipKeyed(a107, { mode: "invalid" });
Iterator.zipKeyed(a107, { mode: "shortest", padding: {} });
Iterator.zipKeyed(a107, { mode: "longest", padding: 0 });
const a138: [number | boolean, string | undefined][] = Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [true] }).toArray();
const a139: { a: number | string; b: number | undefined; }[] = Iterator.zipKeyed({ a: [1], b: [2, 3] }, { mode: "longest", padding: { a: "a" } }).toArray();

declare const a140: boolean[];
const a141: [number | boolean | undefined, string | boolean | undefined][] = Iterator.zip([[1], ["a"]], { mode: "longest", padding: a140 }).toArray();
const a142 = Iterator.zip(a12, { mode: "longest", padding: new Set([false]) }).toArray();
const a143: (number | boolean | undefined)[][] = a142;
const a144: (number | undefined)[][] = a142;
const a145: (number | boolean | undefined)[][] = Iterator.zip([[1], [2, 3]], { mode: "longest", padding: new Set([false]) }).toArray();

declare const a146: { a: boolean; } | { b: string; };
const a147 = Iterator.zipKeyed({ a: [1], b: [2, 3] }, { mode: "longest", padding: a146 }).toArray();
const a148: { a: number | boolean | undefined; b: number | string | undefined; }[] = a147;
const a149: { a: number | undefined; b: number | undefined; }[] = a147;
declare const a150: [boolean] | [string, string];
const a151: [number | boolean | string, number | string | undefined][] = Iterator.zip([[1], [2, 3]], { mode: "longest", padding: a150 }).toArray();

declare const a152: { mode: "longest"; padding?: { a: boolean; }; };
const a153 = Iterator.zipKeyed({ a: [1] }, a152).toArray();
const a154: { a: number | boolean | undefined; }[] = a153;
const a155: { a: number | boolean; }[] = a153;
declare const a156: { mode: "shortest"; } | { mode: "longest"; padding: [boolean]; } | undefined;
const a157: [number | boolean | undefined][] = Iterator.zip([[1]], a156).toArray();
const a158: [number][] = Iterator.zip([[1]], { mode: undefined }).toArray();
const a159: { a: number | undefined; }[] = Iterator.zipKeyed({ a: [1] }, { mode: "longest", padding: undefined }).toArray();

const a160: { a: number | { b: string; }; [a1]: boolean | string; }[] = Iterator.zipKeyed({ a: [1], [a1]: [true, false] }, {
    mode: "longest",
    padding: { a: { b: "a" }, [a1]: "a" },
}).toArray();
const a161: { "0": number | boolean; }[] = Iterator.zipKeyed({ "0": [1] }, { mode: "longest", padding: { 0: false } }).toArray();
const a162: { 0: number | boolean; }[] = Iterator.zipKeyed({ 0: [1] }, { mode: "longest", padding: { "0": false } }).toArray();
const a163 = Iterator.zipKeyed({ 0: [1] }, { mode: "longest", padding: { "01": false } }).toArray();
const a164: { 0: number | undefined; }[] = a163;
const a165: { 0: number; }[] = a163;

declare const a166: Record<number, boolean>;
const a167 = Iterator.zipKeyed({ NaN: [1], Infinity: [2], "-Infinity": [3] }, { mode: "longest", padding: a166 }).toArray();
const a168: { NaN: number | boolean | undefined; Infinity: number | boolean | undefined; "-Infinity": number | boolean | undefined; }[] = a167;
const a169: { NaN: number | undefined; Infinity: number | undefined; "-Infinity": number | undefined; }[] = a167;
const a170 = Iterator.zipKeyed(a58, { mode: "longest", padding: { a: false } }).toArray();
const a171: Record<string, number | boolean | undefined>[] = a170;
const a172: Record<string, number | undefined>[] = a170;

const a173: [number | undefined, string | undefined][] = Iterator.zip<[Iterable<number>, Iterable<string>]>([[1], ["a"]], { mode: "longest", padding: [0, ""] }).toArray();
const a174: (number | undefined)[][] = Iterator.zip<Iterable<number>>(a12, { mode: "longest", padding: [0] }).toArray();
const a175: { a: number | undefined; }[] = Iterator.zipKeyed<{ a: Iterable<number>; }>({ a: [1] }, { mode: "longest", padding: { a: 0 } }).toArray();
const a176: [number | boolean][] = Iterator.zip<[Iterable<number>], [boolean]>([[1]], { mode: "longest", padding: [false] }).toArray();
const a177: { a: number | boolean; }[] = Iterator.zipKeyed<{ a: Iterable<number>; }, { a: boolean; }>({ a: [1] }, { mode: "longest", padding: { a: false } }).toArray();
Iterator.zipKeyed<{ a: Iterable<number>; }>({ a: [1] }, { mode: "longest", padding: 0 });
Iterator.zipKeyed<{}>({}, { mode: "longest", padding: 0 });
Iterator.zipKeyed<{ a: Iterable<number>; }, {}>({ a: [1] }, { mode: "longest", padding: 0 });

// @filename: b.ts

export function f1<T extends Record<string, Iterable<unknown>>>(a: T) {
    return Iterator.zipKeyed(a);
}

export function f2<T extends Record<string, Iterable<unknown>>>(a: T) {
    return Iterator.zipKeyed(a, { mode: "longest" });
}

export function f3<T extends Record<string, Iterable<unknown>>>(a: T) {
    return Iterator.zipKeyed(a, { mode: "longest", padding: {} });
}

export function f4<T extends object>(a: T) {
    return Iterator.zipKeyed(a);
}

export function f5<T, U>(a: Iterable<T>, b: U) {
    return Iterator.zipKeyed({ a }, { mode: "longest", padding: { a: b } });
}

export function f6<T extends readonly (Iterable<unknown> | Iterator<unknown>)[]>(a: T) {
    return Iterator.zip(a);
}

export function f7<T, U extends object>(a: Iterable<T>, b: U) {
    return Iterator.zipKeyed({ a }, { mode: "longest", padding: b });
}

export const a = f1({ a: [1], b: ["a"] }).toArray();
export const b = f2({ a: [1], b: ["a"] }).toArray();
export const c = f3({ a: [1], b: ["a"] }).toArray();
export const d = f4({ a: [1], b: ["a"] }).toArray();
export const e = f5([1], false).toArray();
export const f = f6([[1], ["a"]] as const).toArray();
export const g = f7([1], { a: false }).toArray();
export const h = Iterator.zip;
export const i = Iterator.zipKeyed;
export const j = h([[1], ["a"]], { mode: "longest", padding: [false, false] }).toArray();
export const k = i({ a: [1], b: [2, 3] }, { mode: "longest", padding: { a: false } }).toArray();
