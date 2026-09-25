//// [tests/cases/compiler/iteratorZipInputs.ts] ////

//// [iteratorZipInputs.ts]
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


//// [iteratorZipInputs.js]
"use strict";
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


//// [iteratorZipInputs.d.ts]
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
