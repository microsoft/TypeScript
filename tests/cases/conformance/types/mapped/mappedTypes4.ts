// @strictNullChecks: true
// @declaration: true

type Box<T> = {
};

type Boxified<T> = {
    [P in keyof T]: Box<T[P]>;
};

function boxify<T>(obj: T): Boxified<T> {
    if (typeof obj === "object") {
        let result = {} as Boxified<T>;
        for (let k in obj) {
            result[k] = { value: obj[k] };
        }
        return result;
    }
    return <any>obj;
}

type A = { a: string };
type B = { b: string };
type C = { c: string };

function f1(x: A | B | C | undefined) {
    return boxify(x);
}

type T00 = Partial<A | B | C>;
type T01 = Readonly<A | B | C | null | undefined>;
type T02 = Boxified<A | B[] | C | string>
type T03 = Readonly<string | number | boolean | null | undefined | void>;
type T04 = Boxified<string | number | boolean | null | undefined | void>;
type T05 = Partial<"hello" | "world" | 42>;

type BoxifiedWithSentinel<T, U> = {
    [P in keyof T]: Box<T[P]> | U;
}

type T10 = BoxifiedWithSentinel<A | B | C, null>;
type T11 = BoxifiedWithSentinel<A | B | C, undefined>;
type T12 = BoxifiedWithSentinel<string, undefined>;

type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

type Foo = {
    x: number;
    y: { a: string, b: number };
    z: boolean;
};

type DeepReadonlyFoo = {
    readonly x: number;
    readonly y: { readonly a: string, readonly b: number };
    readonly z: boolean;
};

var x1: DeepReadonly<Foo>;
var x1: DeepReadonlyFoo;

// Repro from #13232

type Z = { a: number };
type Clone<T> = {
  [P in keyof (T & {})]: T[P];
};
type M = Clone<Z>; // M should be { a: number }

var z1: Z;
var z1: Clone<Z>;
