// @strict: true
// @declaration: true

type Diff<T, U> = T extends U ? never : T;
type Filter<T, U> = T extends U ? T : never;
type NonNullable<T> = Diff<T, null | undefined>;

type T00 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "b" | "d"
type T01 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type T02 = Diff<string | number | (() => void), Function>;  // string | number
type T03 = Filter<string | number | (() => void), Function>;  // () => void

type T04 = NonNullable<string | number | undefined>;  // string | number
type T05 = NonNullable<(() => string) | string[] | null | undefined>;  // (() => string) | string[]

function f1<T>(x: T, y: NonNullable<T>) {
    x = y;
    y = x;  // Error
}

function f2<T extends string | undefined>(x: T, y: NonNullable<T>) {
    x = y;
    y = x;  // Error
    let s1: string = x;  // Error
    let s2: string = y;
}

function f3<T>(x: Partial<T>[keyof T], y: NonNullable<Partial<T>[keyof T]>) {
    x = y;
    y = x;  // Error
}

type Options = { k: "a", a: number } | { k: "b", b: string } | { k: "c", c: boolean };

type T10 = Diff<Options, { k: "a" | "b" }>;  // { k: "c", c: boolean }
type T11 = Filter<Options, { k: "a" | "b" }>;  // { k: "a", a: number } | { k: "b", b: string }

type T12 = Diff<Options, { k: "a" } | { k: "b" }>;  // { k: "c", c: boolean }
type T13 = Filter<Options, { k: "a" } | { k: "b" }>;  // { k: "a", a: number } | { k: "b", b: string }

type T14 = Diff<Options, { q: "a" }>;  // Options
type T15 = Filter<Options, { q: "a" }>;  // never

declare function f4<T extends Options, K extends string>(p: K): Filter<T, { k: K }>;
let x0 = f4("a");  // { k: "a", a: number }

type OptionsOfKind<K extends Options["k"]> = Filter<Options, { k: K }>;

type T16 = OptionsOfKind<"a" | "b">;  // { k: "a", a: number } | { k: "b", b: string }

type Select<T, K extends keyof T, V extends T[K]> = Filter<T, { [P in K]: V }>;

type T17 = Select<Options, "k", "a" | "b">;  // // { k: "a", a: number } | { k: "b", b: string }

type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

type T20 = TypeName<string | (() => void)>;  // "string" | "function"
type T21 = TypeName<any>;  // "string" | "number" | "boolean" | "undefined" | "function" | "object"
type T22 = TypeName<never>;  // "string" | "number" | "boolean" | "undefined" | "function" | "object"
type T23 = TypeName<{}>;  // "object"

type KnockoutObservable<T> = { object: T };
type KnockoutObservableArray<T> = { array: T };

type KnockedOut<T> = T extends any[] ? KnockoutObservableArray<T[number]> : KnockoutObservable<T>;

type KnockedOutObj<T> = {
    [P in keyof T]: KnockedOut<T[P]>;
}

interface Item {
    id: number;
    name: string;
    subitems: string[];
}

type KOItem = KnockedOutObj<Item>;

interface Part {
    id: number;
    name: string;
    subparts: Part[];
    updatePart(newName: string): void;
}

type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

type T30 = FunctionProperties<Part>;
type T31 = NonFunctionProperties<Part>;

function f7<T>(x: T, y: FunctionProperties<T>, z: NonFunctionProperties<T>) {
    x = y;  // Error
    x = z;  // Error
    y = x;
    y = z;  // Error
    z = x;
    z = y;  // Error
}

function f8<T>(x: keyof T, y: FunctionPropertyNames<T>, z: NonFunctionPropertyNames<T>) {
    x = y;
    x = z;
    y = x;  // Error
    y = z;  // Error
    z = x;  // Error
    z = y;  // Error
}

type DeepReadonly<T> =
    T extends any[] ? DeepReadonlyArray<T[number]> :
    T extends object ? DeepReadonlyObject<T> :
    T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
    readonly [P in NonFunctionPropertyNames<T>]: DeepReadonly<T[P]>;
};

function f10(part: DeepReadonly<Part>) {
    let name: string = part.name;
    let id: number = part.subparts[0].id;
    part.id = part.id;  // Error
    part.subparts[0] = part.subparts[0];  // Error
    part.subparts[0].id = part.subparts[0].id;  // Error
    part.updatePart("hello");  // Error
}

type ZeroOf<T extends number | string | boolean> = T extends number ? 0 : T extends string ? "" : false;

function zeroOf<T extends number | string | boolean>(value: T) {
    return <ZeroOf<T>>(typeof value === "number" ? 0 : typeof value === "string" ? "" : false);
}

function f20<T extends string>(n: number, b: boolean, x: number | boolean, y: T) {
    zeroOf(5);  // 0
    zeroOf("hello");  // ""
    zeroOf(true);  // false
    zeroOf(n);  // 0
    zeroOf(b);  // False
    zeroOf(x);  // 0 | false
    zeroOf(y);  // ZeroOf<T>
}

function f21<T extends number | string>(x: T, y: ZeroOf<T>) {
    let z1: number | string = y;
    let z2: 0 | "" = y;
    x = y;  // Error
    y = x;  // Error
}

type Extends<T, U> = T extends U ? true : false;
type If<C extends boolean, T, F> = C extends true ? T : F;
type Not<C extends boolean> = If<C, false, true>;
type And<A extends boolean, B extends boolean> = If<A, B, false>;
type Or<A extends boolean, B extends boolean> = If<A, true, B>;

type isString<T> = Extends<T, string>;

type Q1 = isString<number>;  // false
type Q2 = isString<"abc">;  // true
type Q3 = isString<any>;  // boolean
type Q4 = isString<never>;  // boolean

type N1 = Not<false>;  // true
type N2 = Not<true>;  // false
type N3 = Not<boolean>;  // boolean

type A1 = And<false, false>;  // false
type A2 = And<false, true>;  // false
type A3 = And<true, false>;  // false
type A4 = And<true, true>;  // true
type A5 = And<boolean, false>;  // false
type A6 = And<false, boolean>;  // false
type A7 = And<boolean, true>;  // boolean
type A8 = And<true, boolean>;  // boolean
type A9 = And<boolean, boolean>;  // boolean

type O1 = Or<false, false>;  // false
type O2 = Or<false, true>;  // true
type O3 = Or<true, false>;  // true
type O4 = Or<true, true>;  // true
type O5 = Or<boolean, false>;  // boolean
type O6 = Or<false, boolean>;  // boolean
type O7 = Or<boolean, true>;  // true
type O8 = Or<true, boolean>;  // true
type O9 = Or<boolean, boolean>;  // boolean
