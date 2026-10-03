//// [tests/cases/compiler/iteratorZip.ts] ////

//// [iteratorZip.ts]
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

Iterator.zip([[1], ["a"]] as const, { mode: "longest", padding: [true] });

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
Iterator.zipKeyed({ a: [1] }, { mode: "longest", padding: { a: "invalid" } });


//// [iteratorZip.js]
"use strict";
const a2 = Iterator.zip([
    [1, 2],
    new Set(["a", "b"]),
]).toArray();
a2[0][0] = 2;
const a3 = Iterator.zip([[1], ["a"]], { mode: "shortest" }).toArray();
const a4 = Iterator.zip([[1], ["a"]], { mode: "strict" }).toArray();
const a5 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [1, "a"] }).toArray();
const a6 = Iterator.zip([[1], ["a"]], { mode: "longest" }).toArray();
const a7 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [1] }).toArray();
const a9 = Iterator.zip([[1], ["a"]], a8).toArray();
const a10 = Iterator.zip([]).toArray();
const a11 = Iterator.zip([], { mode: "longest" }).toArray();
const a13 = Iterator.zip(a12).toArray();
const a14 = Iterator.zip(a12, { mode: "longest" }).toArray();
const a15 = Iterator.zip(a12, a8).toArray();
const a17 = Iterator.zip(a16, { mode: "longest", padding: [] }).toArray();
const a18 = Iterator.zipKeyed({
    a: [1, 2],
    b: new Set(["a", "b"]),
    [a1]: [true, false],
}).toArray();
a18[0].a = 2;
const a19 = Iterator.zipKeyed({ a: [1], b: ["a"] }, {
    mode: "longest",
    padding: { a: 1, b: "a" },
}).toArray();
const a20 = Iterator.zipKeyed({ a: [1], b: ["a"] }, {
    mode: "longest",
}).toArray();
const a21 = Iterator.zipKeyed({ a: [1], b: ["a"] }, {
    mode: "longest",
    padding: { b: "a" },
}).toArray();
const a22 = Iterator.zipKeyed({ a: [1], b: ["a"] }, a8).toArray();
const a24 = Iterator.zipKeyed(a23).toArray();
Iterator.zip([[1]], { mode: "invalid" });
Iterator.zip([[1], ["a"]], { mode: "longest", padding: [true] });
Iterator.zip([[1]], { mode: "shortest", padding: [1] });
Iterator.zip(0);
Iterator.zipKeyed({ a: 0 });
const a25 = Iterator.zipKeyed({}).toArray();
const a26 = Iterator.zipKeyed({}, { mode: "longest", padding: {} }).toArray();
const a28 = Iterator.zipKeyed(a27).toArray();
Iterator.zip("ab");
Iterator.zip(["ab"]);
Iterator.zip(new Set(["ab"]));
Iterator.zipKeyed("ab");
Iterator.zipKeyed({ a: "ab" });
Iterator.zip([], { mode: "longest", padding: "ab" });
Iterator.zip([["a"]], { mode: "longest", padding: "ab" });
Iterator.zipKeyed({}, { mode: "longest", padding: "ab" });
const a29 = Iterator.zip([new String("ab")]).toArray();
const a30 = Iterator.zipKeyed({ a: new String("ab") }).toArray();
const a31 = Iterator.zip([["a"]], { mode: "longest", padding: new String("ab") }).toArray();
const a32 = Iterator.zipKeyed({ a: [1], b: undefined }).toArray();
const a33 = a32;
a32[0].b;
const a34 = Iterator.zipKeyed({ a: undefined }).toArray();
const a35 = Iterator.zipKeyed({ a: undefined }, { mode: "longest", padding: {} }).toArray();
const a37 = Iterator.zipKeyed(a36).toArray();
const a38 = a37;
a37[0].a = 2;
a37[0].b = "a";
a37[0].c = true;
a37[0].d;
const a39 = a37;
const a40 = Iterator.zipKeyed(a36, { mode: "longest" }).toArray();
const a42 = Iterator.zipKeyed(a41).toArray();
Iterator.zipKeyed(a43);
Iterator.zipKeyed(a43, { mode: "longest" });
Iterator.zipKeyed(a43, { mode: "longest", padding: {} });
Iterator.zipKeyed(a44);
const a46 = Iterator.zipKeyed(a45).toArray();
const a49 = Iterator.zipKeyed(a48).toArray();
Iterator.zipKeyed({ a: [1], b: null });
Iterator.zipKeyed({ a: [1], b: false });
Iterator.zip([undefined]);
const a51 = Iterator.zipKeyed(a50).toArray();
const a52 = Iterator.zipKeyed({ a: [1], b: undefined }, { mode: "longest", padding: { a: 0 } }).toArray();
const a53 = Iterator.zipKeyed({ a: [1], b: undefined }, { mode: "longest" }).toArray();
function f1(a) {
    const b = Iterator.zipKeyed({ a }).toArray();
    const c = Iterator.zip([a]).toArray();
    return { b, c };
}
const a54 = [[1, 2], [3]];
const a55 = Iterator.zip(a54, { mode: "longest", padding: [0] }).toArray();
const a56 = a55;
const a57 = a55;
const a58 = { a: [1], b: [2, 3] };
const a59 = Iterator.zipKeyed(a58, { mode: "longest", padding: {} }).toArray();
const a60 = a59;
const a61 = a59;
const a63 = Iterator.zipKeyed({ a: [1], b: [2, 3] }, { mode: "longest", padding: a62 }).toArray();
const a64 = a63;
const a65 = a63;
const a66 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0, ""] }).toArray();
const a67 = a66;
const a68 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0, b: "" } }).toArray();
const a69 = a68;
const a70 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: [0] }).toArray();
const a71 = a70;
const a72 = a70;
const a73 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: { a: 0 } }).toArray();
const a74 = a73;
const a75 = a73;
const a77 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: a76 }).toArray();
const a79 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: a78 }).toArray();
const a80 = a79;
const a82 = Iterator.zip(a81, { mode: "longest", padding: [0] }).toArray();
const a83 = a82;
const a85 = Iterator.zipKeyed(a84, { mode: "longest", padding: { a: 0 } }).toArray();
const a86 = a85;
const a88 = Iterator.zipKeyed({ a: [1], b: ["a"] }, { mode: "longest", padding: a87 }).toArray();
const a89 = a88;
const a90 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: { a: undefined, b: 0 } }).toArray();
const a91 = a90;
const a93 = Iterator.zipKeyed(a92, { mode: "longest", padding: {} }).toArray();
const a94 = a93;
const a96 = Iterator.zipKeyed({ [a95]: [1] }, { mode: "longest", padding: { [a95]: 0 } }).toArray();
const a98 = Iterator.zipKeyed({ a: [1], b: [2] }, { mode: "longest", padding: a97 }).toArray();
const a99 = a98;
const a100 = a98;
const a102 = Iterator.zip([[1], ["a"]], { mode: "longest", padding: a101 }).toArray();
const a103 = a102;
const a104 = a102;
const a105 = Iterator.zip([[1], [2]], { mode: "longest", padding: [undefined, 0] }).toArray();
const a106 = a90;
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
const a118 = a108[0].b;
const a119 = a113[0].b;
const a121 = Iterator.zipKeyed({ a: [1], [a120]: ["a"] }).toArray();
const a122 = Iterator.zipKeyed({ a: [1] }, { mode: "longest" }).toArray();
const a123 = Iterator.zipKeyed({ a: [1] }, { mode: "longest", padding: { a: 0 } }).toArray();
const a125 = Iterator.zipKeyed(a124).toArray();
const a126 = Iterator.zipKeyed(a124, { mode: "strict" }).toArray();
const a127 = Iterator.zipKeyed(a124, { mode: "longest" }).toArray();
const a128 = Iterator.zipKeyed(a124, { mode: "longest", padding: { a: 0 } }).toArray();
const a129 = a125[0].a;
const a130 = a126[0].a;
const a131 = a127[0].a;
const a132 = a128[0].a;
const a133 = a125;
const a135 = Iterator.zipKeyed(a134).toArray();
const a136 = a135[0].a;
const a137 = a135;
Iterator.zipKeyed(0);
Iterator.zipKeyed(null);
Iterator.zipKeyed(a107, { mode: "invalid" });
Iterator.zipKeyed(a107, { mode: "shortest", padding: {} });
Iterator.zipKeyed(a107, { mode: "longest", padding: 0 });
Iterator.zipKeyed({ a: [1] }, { mode: "longest", padding: { a: "invalid" } });


//// [iteratorZip.d.ts]
declare const a1: unique symbol;
declare const a2: [number, string][];
declare const a3: [number, string][];
declare const a4: [number, string][];
declare const a5: [number, string][];
declare const a6: [number | undefined, string | undefined][];
declare const a7: [number | undefined, string | undefined][];
declare const a8: {
    mode: "shortest";
} | {
    mode: "longest";
};
declare const a9: [number | undefined, string | undefined][];
declare const a10: never[];
declare const a11: never[];
declare const a12: Iterable<Iterable<number>>;
declare const a13: number[][];
declare const a14: (number | undefined)[][];
declare const a15: (number | undefined)[][];
declare const a16: Iterable<number>[];
declare const a17: (number | undefined)[][];
declare const a18: {
    a: number;
    b: string;
    [a1]: boolean;
}[];
declare const a19: {
    a: number;
    b: string;
}[];
declare const a20: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const a21: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const a22: {
    a: number | undefined;
    b: string | undefined;
}[];
interface I1 {
    a: Iterable<number>;
    b: Iterator<string>;
}
declare const a23: I1;
declare const a24: {
    a: number;
    b: string;
}[];
declare const a25: Record<PropertyKey, unknown>[];
declare const a26: Record<PropertyKey, unknown>[];
declare const a27: {
    a: Iterable<number>;
} | {
    b: Iterator<string>;
};
declare const a28: ({
    a: number;
} | {
    b: string;
})[];
declare const a29: [string][];
declare const a30: {
    a: string;
}[];
declare const a31: (string | undefined)[][];
declare const a32: ({
    a: number;
} & {})[];
declare const a33: {
    a: number;
}[];
declare const a34: never[];
declare const a35: never[];
interface I2 {
    readonly a: Iterable<number>;
    readonly b?: Iterator<string>;
    readonly c: Iterable<boolean> | undefined;
    readonly d?: undefined;
}
declare const a36: I2;
declare const a37: ({
    a: number;
} & {
    b?: string | undefined;
    c?: boolean | undefined;
})[];
declare const a38: {
    a: number;
    b?: string;
    c?: boolean;
}[];
declare const a39: {
    a: number;
    c: boolean;
}[];
declare const a40: {
    a: number | undefined;
    b?: string | undefined;
    c?: boolean | undefined;
}[];
declare const a41: {
    a: Iterable<number>;
} | {
    b: Iterator<string>;
};
declare const a42: ({
    a: number;
} | {
    b: string;
})[];
declare const a43: {
    a: Iterable<number>;
} | {
    b: number;
};
declare const a44: {
    a?: Iterable<number>;
} | {
    b: string;
};
declare const a45: {
    a: Iterable<number>;
} | {
    b: undefined;
};
declare const a46: {
    a: number;
}[];
declare const a47: unique symbol;
declare const a48: {
    a: Iterable<number>;
    [a47]?: Iterable<string>;
};
declare const a49: {
    a: number;
    [a47]?: string;
}[];
declare const a50: {
    a?: undefined;
};
declare const a51: never[];
declare const a52: {
    a: number;
}[];
declare const a53: {
    a: number | undefined;
}[];
declare function f1<T>(a: Iterable<T>): {
    b: {
        a: T;
    }[];
    c: [T][];
};
declare const a54: [Iterable<number>, ...Iterable<number>[]];
declare const a55: [number, ...(number | undefined)[]][];
declare const a56: (number | undefined)[][];
declare const a57: number[][];
declare const a58: Record<string, Iterable<number>>;
declare const a59: ({
    [x: string]: number | undefined;
} & {})[];
declare const a60: Record<string, number | undefined>[];
declare const a61: Record<string, number>[];
declare const a62: Record<string, number>;
declare const a63: ({
    a: number | undefined;
    b: number | undefined;
} & {})[];
declare const a64: {
    a: number | undefined;
    b: number | undefined;
}[];
declare const a65: {
    a: number;
    b: number;
}[];
declare const a66: [number, string][];
declare const a67: [number, string][];
declare const a68: ({
    a: number;
    b: string;
} & {})[];
declare const a69: {
    a: number;
    b: string;
}[];
declare const a70: [number, string | undefined][];
declare const a71: [number | undefined, string | undefined][];
declare const a72: [number, string][];
declare const a73: ({
    a: number;
    b: string | undefined;
} & {})[];
declare const a74: {
    a: number | undefined;
    b: string | undefined;
}[];
declare const a75: {
    a: number;
    b: string;
}[];
declare const a76: readonly [number, string];
declare const a77: [number, string][];
declare const a78: [number, string?];
declare const a79: [number, string | undefined][];
declare const a80: [number, string][];
declare const a81: [Iterable<number>] | [Iterable<number>, Iterable<number>];
declare const a82: ([number] | [number, number | undefined])[];
declare const a83: number[][];
declare const a84: {
    a: Iterable<number>;
} | {
    b: Iterable<string>;
};
declare const a85: (({
    a: number;
} & {}) | ({
    b: string | undefined;
} & {}))[];
declare const a86: ({
    a: number;
} | {
    b: string;
})[];
declare const a87: {
    a: number;
} | {
    b: string;
};
declare const a88: ({
    a: number | undefined;
    b: string | undefined;
} & {})[];
declare const a89: {
    a: number;
    b: string;
}[];
declare const a90: ({
    a: number | undefined;
    b: number;
} & {})[];
declare const a91: {
    a: number;
    b: number;
}[];
declare const a92: {
    [K in `a${string}`]: Iterable<number>;
};
declare const a93: ({
    [x: `a${string}`]: number | undefined;
} & {})[];
declare const a94: {
    [K in `a${string}`]: number;
}[];
declare const a95: unique symbol;
declare const a96: {
    [a95]: number;
}[];
declare const a97: Record<string, number> & {
    a: number;
};
declare const a98: ({
    a: number;
    b: number | undefined;
} & {})[];
declare const a99: {
    a: number;
    b: number | undefined;
}[];
declare const a100: {
    a: number;
    b: number;
}[];
declare const a101: [number] | [number, string];
declare const a102: [number, string | undefined][];
declare const a103: [number, string | undefined][];
declare const a104: [number, string][];
declare const a105: [number | undefined, number][];
declare const a106: {
    a: number | undefined;
    b: number;
}[];
declare class C1 {
    a: number[];
    get b(): string;
    f(): string;
}
declare const a107: C1;
declare const a108: Record<PropertyKey, unknown>[];
declare const a109: Record<PropertyKey, unknown>[];
declare const a110: Record<PropertyKey, unknown>[];
declare const a111: Record<PropertyKey, unknown>[];
declare const a112: {
    a: number[];
    b: string;
};
declare const a113: Record<PropertyKey, unknown>[];
declare const a114: Record<PropertyKey, unknown>[];
declare const a115: {
    a: number[];
    b: string;
};
declare const a116: Record<PropertyKey, unknown>[];
declare const a117: Record<PropertyKey, unknown>[];
declare const a118: string;
declare const a119: string;
declare const a120: unique symbol;
declare const a121: {
    a: number;
    [a120]: string;
}[];
declare const a122: {
    a: number | undefined;
}[];
declare const a123: {
    a: number;
}[];
declare const a124: object;
declare const a125: Record<PropertyKey, unknown>[];
declare const a126: Record<PropertyKey, unknown>[];
declare const a127: Record<PropertyKey, unknown>[];
declare const a128: Record<PropertyKey, unknown>[];
declare const a129: unknown;
declare const a130: unknown;
declare const a131: unknown;
declare const a132: unknown;
declare const a133: never[];
declare const a134: {};
declare const a135: Record<PropertyKey, unknown>[];
declare const a136: unknown;
declare const a137: never[];
