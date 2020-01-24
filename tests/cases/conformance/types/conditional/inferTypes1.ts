// @strict: true
// @declaration: true

type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

type T00 = Unpacked<string>;  // string
type T01 = Unpacked<string[]>;  // string
type T02 = Unpacked<() => string>;  // string
type T03 = Unpacked<Promise<string>>;  // string
type T04 = Unpacked<Unpacked<Promise<string>[]>>;  // string
type T05 = Unpacked<any>;  // any
type T06 = Unpacked<never>;  // never

function f1(s: string) {
    return { a: 1, b: s };
}

class C {
    x = 0;
    y = 0;
}

abstract class Abstract {
    x = 0;
    y = 0;
}

type T10 = ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void
type T12 = ReturnType<(<T>() => T)>;  // {}
type T13 = ReturnType<(<T extends U, U extends number[]>() => T)>;  // number[]
type T14 = ReturnType<typeof f1>;  // { a: number, b: string }
type T15 = ReturnType<any>;  // any
type T16 = ReturnType<never>;  // never
type T17 = ReturnType<string>;  // Error
type T18 = ReturnType<Function>;  // Error
type T19<T extends any[]> = ReturnType<(x: string, ...args: T) => T[]>;  // T[]

type U10 = InstanceType<typeof C>;  // C
type U11 = InstanceType<any>;  // any
type U12 = InstanceType<never>;  // never
type U13 = InstanceType<string>;  // Error
type U14 = InstanceType<Function>;  // Error
type U15 = InstanceType<typeof Abstract>;  // Abstract
type U16<T extends any[]> = InstanceType<new (x: string, ...args: T) => T[]>;  // T[]
type U17<T extends any[]> = InstanceType<abstract new (x: string, ...args: T) => T[]>;  // T[]

type ArgumentType<T extends (x: any) => any> = T extends (a: infer A) => any ? A : any;

type T20 = ArgumentType<() => void>;  // {}
type T21 = ArgumentType<(x: string) => number>;  // string
type T22 = ArgumentType<(x?: string) => number>;  // string | undefined
type T23 = ArgumentType<(...args: string[]) => number>;  // string
type T24 = ArgumentType<(x: string, y: string) => number>;  // Error
type T25 = ArgumentType<Function>;  // Error
type T26 = ArgumentType<any>;  // any
type T27 = ArgumentType<never>;  // never

type X1<T extends { x: any, y: any }> = T extends { x: infer X, y: infer Y } ? [X, Y] : any;

type T30 = X1<{ x: any, y: any }>;  // [any, any]
type T31 = X1<{ x: number, y: string }>;  // [number, string]
type T32 = X1<{ x: number, y: string, z: boolean }>;  // [number, string]

type X2<T> = T extends { a: infer U, b: infer U } ? U : never;

type T40 = X2<{}>;  // never
type T41 = X2<{ a: string }>;  // never
type T42 = X2<{ a: string, b: string }>;  // string
type T43 = X2<{ a: number, b: string }>;  // string | number
type T44 = X2<{ a: number, b: string, c: boolean }>;  // string | number

type X3<T> = T extends { a: (x: infer U) => void, b: (x: infer U) => void } ? U : never;

type T50 = X3<{}>;  // never
type T51 = X3<{ a: (x: string) => void }>;  // never
type T52 = X3<{ a: (x: string) => void, b: (x: string) => void }>;  // string
type T53 = X3<{ a: (x: number) => void, b: (x: string) => void }>;  // never
type T54 = X3<{ a: (x: number) => void, b: () => void }>;  // number

type T60 = infer U;  // Error
type T61<T> = infer A extends infer B ? infer C : infer D;  // Error
type T62<T> = U extends (infer U)[] ? U : U;  // Error
type T63<T> = T extends (infer A extends infer B ? infer C : infer D) ? string : number;

type T70<T extends string> = { x: T };
type T71<T> = T extends T70<infer U> ? T70<U> : never;

type T72<T extends number> = { y: T };
type T73<T> = T extends T72<infer U> ? T70<U> : never;  // Error

type T74<T extends number, U extends string> = { x: T, y: U };
type T75<T> = T extends T74<infer U, infer U> ? T70<U> | T72<U> | T74<U, U> : never;

type T76<T extends T[], U extends T> = { x: T };
type T77<T> = T extends T76<infer X, infer Y> ? T76<X, Y> : never;
type T78<T> = T extends T76<infer X, infer X> ? T76<X, X> : never;

type Foo<T extends string, U extends T> = [T, U];
type Bar<T> = T extends Foo<infer X, infer Y> ? Foo<X, Y> : never;

type T90 = Bar<[string, string]>;  // [string, string]
type T91 = Bar<[string, "a"]>;  // [string, "a"]
type T92 = Bar<[string, "a"] & { x: string }>;  // [string, "a"]
type T93 = Bar<["a", string]>;  // never
type T94 = Bar<[number, number]>;  // never

// Example from #21496

type JsonifiedObject<T extends object> = { [K in keyof T]: Jsonified<T[K]> };

type Jsonified<T> =
    T extends string | number | boolean | null ? T
    : T extends undefined | Function ? never // undefined and functions are removed
    : T extends { toJSON(): infer R } ? R // toJSON is called if it exists (e.g. Date)
    : T extends object ? JsonifiedObject<T>
    : "what is this";

type Example = {
    str: "literalstring",
    fn: () => void,
    date: Date,
    customClass: MyClass,
    obj: {
        prop: "property",
        clz: MyClass,
        nested: { attr: Date }
    },
}

declare class MyClass {
    toJSON(): "correct";
}

type JsonifiedExample = Jsonified<Example>;
declare let ex: JsonifiedExample;
const z1: "correct" = ex.customClass;
const z2: string = ex.obj.nested.attr;

// Repros from #21631

type A1<T, U extends A1<any, any>> = [T, U];
type B1<S> = S extends A1<infer T, infer U> ? [T, U] : never;

type A2<T, U extends void> = [T, U];
type B2<S> = S extends A2<infer T, infer U> ? [T, U] : never;
type C2<S, U extends void> = S extends A2<infer T, U> ? [T, U] : never;

// Repro from #21735

type A<T> = T extends string ? { [P in T]: void; } : T;
type B<T> = string extends T ? { [P in T]: void; } : T;  // Error

// Repro from #22302

type MatchingKeys<T, U, K extends keyof T = keyof T> =
    K extends keyof T ? T[K] extends U ? K : never : never;

type VoidKeys<T> = MatchingKeys<T, void>;

interface test {
    a: 1,
    b: void
}

type T80 = MatchingKeys<test, void>;
type T81 = VoidKeys<test>;

// Repro from #22221

type MustBeString<T extends string> = T;
type EnsureIsString<T> = T extends MustBeString<infer U> ? U : never;

type Test1 = EnsureIsString<"hello">;  // "hello"
type Test2 = EnsureIsString<42>;  // never

// Repros from #26856

function invoker <K extends string | number | symbol, A extends any[]> (key: K, ...args: A) {
    return <T extends Record<K, (...args: A) => any>> (obj: T): ReturnType<T[K]> => obj[key](...args)
}

const result = invoker('test', true)({ test: (a: boolean) => 123 })

type Foo2<A extends any[]> = ReturnType<(...args: A) => string>;
