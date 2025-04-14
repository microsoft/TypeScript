//// [tests/cases/conformance/types/conditional/inferTypesWithExtends1.ts] ////

//// [inferTypesWithExtends1.ts]
// infer to tuple element
type X1<T extends any[]> =
    T extends [infer U extends string] ? ["string", U] :
    T extends [infer U extends number] ? ["number", U] :
    never;

type X1_T1 = X1<["a"]>; // ["string", "a"]
type X1_T2 = X1<[1]>; // ["number", 1]
type X1_T3 = X1<[object]>; // never

// infer to argument
type X2<T extends (...args: any[]) => void> =
    T extends (a: infer U extends string) => void ? ["string", U] :
    T extends (a: infer U extends number) => void ? ["number", U] :
    never;

type X2_T1 = X2<(a: "a") => void>; // ["string", "a"]
type X2_T2 = X2<(a: 1) => void>; // ["number", 1]
type X2_T3 = X2<(a: object) => void>; // never

// infer to return type
type X3<T extends (...args: any[]) => any> =
    T extends (...args: any[]) => (infer U extends string) ? ["string", U] :
    T extends (...args: any[]) => (infer U extends number) ? ["number", U] :
    never;

type X3_T1 = X3<() => "a">; // ["string", "a"]
type X3_T2 = X3<() => 1>; // ["number", 1]
type X3_T3 = X3<() => object>; // never

// infer to instance type
type X4<T extends new (...args: any[]) => any> =
    T extends new (...args: any[]) => (infer U extends { a: string }) ? ["string", U] :
    T extends new (...args: any[]) => (infer U extends { a: number }) ? ["number", U] :
    never;

type X4_T1 = X4<new () => { a: "a" }>; // ["string", { a: "a" }]
type X4_T2 = X4<new () => { a: 1 }>; // ["number", { a: 1 }]
type X4_T3 = X4<new () => { a: object }>; // never

// infer to type argument
type X5<T> =
    T extends Promise<infer U extends string> ? ["string", U] :
    T extends Promise<infer U extends number> ? ["number", U] :
    never;

type X5_T1 = X5<Promise<"a" | "b">>; // ["string", "a" | "b"]
type X5_T2 = X5<Promise<1 | 2>>; // ["number", 1 | 2]
type X5_T3 = X5<Promise<1n | 2n>>; // never

// infer to property type
type X6<T> =
    T extends { a: infer U extends string } ? ["string", U] :
    T extends { a: infer U extends number } ? ["number", U] :
    never;

type X6_T1 = X6<{ a: "a" }>; // ["string", "a"]
type X6_T2 = X6<{ a: 1 }>; // ["number", 1]
type X6_T3 = X6<{ a: object }>; // never

// infer twice with same constraint
type X7<T> =
    T extends { a: infer U extends string, b: infer U extends string } ? ["string", U] :
    T extends { a: infer U extends number, b: infer U extends number } ? ["number", U] :
    never;

type X7_T1 = X7<{ a: "a", b: "b" }>; // ["string", "a" | "b"]
type X7_T2 = X7<{ a: 1, b: 2 }>; // ["number", 1 | 2]
type X7_T3 = X7<{ a: object, b: object }>; // never
type X7_T4 = X7<{ a: "a", b: 1 }>; // never

// infer twice with missing second constraint (same behavior as class/interface)
type X8<T> =
    T extends { a: infer U extends string, b: infer U } ? ["string", U] :
    T extends { a: infer U extends number, b: infer U } ? ["number", U] :
    never;

type X8_T1 = X8<{ a: "a", b: "b" }>; // ["string", "a" | "b"]
type X8_T2 = X8<{ a: 1, b: 2 }>; // ["number", 1 | 2]
type X8_T3 = X8<{ a: object, b: object }>; // never
type X8_T4 = X8<{ a: "a", b: 1 }>; // never

// infer twice with missing first constraint (same behavior as class/interface)
type X9<T> =
    T extends { a: infer U, b: infer U extends string } ? ["string", U] :
    T extends { a: infer U, b: infer U extends number } ? ["number", U] :
    never;

type X9_T1 = X9<{ a: "a", b: "b" }>; // ["string", "a" | "b"]
type X9_T2 = X9<{ a: 1, b: 2 }>; // ["number", 1 | 2]
type X9_T3 = X9<{ a: object, b: object }>; // never
type X9_T4 = X9<{ a: "a", b: 1 }>; // never

// Speculative lookahead for `infer T extends U ?`
type X10<T> = T extends (infer U extends number ? 1 : 0) ? 1 : 0; // ok, parsed as conditional
type X10_Y1<T> = X10<T extends number ? 1 : 0>;
type X10_T1_T1 = X10_Y1<number>;

type X11<T> = T extends ((infer U) extends number ? 1 : 0) ? 1 : 0; // ok, parsed as conditional
type X12<T> = T extends (infer U extends number) ? 1 : 0; // ok, parsed as `infer..extends` (no trailing `?`)
type X13<T> = T extends infer U extends number ? 1 : 0; // ok, parsed as `infer..extends` (conditional types not allowed in 'extends type')
type X14<T> = T extends keyof infer U extends number ? 1 : 0; // ok, parsed as `infer..extends` (precedence wouldn't have parsed the `?` as part of a type operator)
type X15<T> = T extends { [P in infer U extends keyof T ? 1 : 0]: 1; } ? 1 : 0; // ok, parsed as conditional
type X16<T> = T extends { [P in infer U extends keyof T]: 1; } ? 1 : 0; // ok, parsed as `infer..extends` (no trailing `?`)
type X17<T> = T extends { [P in keyof T as infer U extends P ? 1 : 0]: 1; } ? 1 : 0; // ok, parsed as conditional
type X18<T> = T extends { [P in keyof T as infer U extends P]: 1; } ? 1 : 0; // ok, parsed as `infer..extends` (no trailing `?`)

type X19<T extends string | number> = T extends (infer U extends number) ? [T, U] : never;
type X19_T1 = X19<"a">; // never
type X19_T2 = X19<1>; // [1, 1]
type X19_T3 = X19<1 | "a">; // [1, 1]

type X20<T> = T extends (infer U extends number) ? T extends (infer V extends U) ? [T, U, V] : never : never;
type X20_T1 = X20<1 | "a">; // [1, 1, 1]

type X21<T, N extends number> = T extends (infer U extends N) ? [T, U] : never;
type X21_T1 = X21<1, 1>; // [1, 1]
type X21_T2 = X21<1 | "a", 1>; // [1, 1]
type X21_T3 = X21<1 | 2, 1>; // [1, 1]
type X21_T4 = X21<1 | 2, 2 | 3>; // [2, 2]
type X21_T5 = X21<1 | 2, 3>; // never

// from mongoose
type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;

declare const x1: <T>() => (T extends infer U extends number ? 1 : 0);
function f1() {
    return x1;
}

type ExpectNumber<T extends number> = T;
declare const x2: <T>() => (T extends ExpectNumber<infer U> ? 1 : 0);
function f2() {
    return x2;
}

//// [inferTypesWithExtends1.js]
"use strict";
function f1() {
    return x1;
}
function f2() {
    return x2;
}


//// [inferTypesWithExtends1.d.ts]
type X1<T extends any[]> = T extends [infer U extends string] ? ["string", U] : T extends [infer U extends number] ? ["number", U] : never;
type X1_T1 = X1<["a"]>;
type X1_T2 = X1<[1]>;
type X1_T3 = X1<[object]>;
type X2<T extends (...args: any[]) => void> = T extends (a: infer U extends string) => void ? ["string", U] : T extends (a: infer U extends number) => void ? ["number", U] : never;
type X2_T1 = X2<(a: "a") => void>;
type X2_T2 = X2<(a: 1) => void>;
type X2_T3 = X2<(a: object) => void>;
type X3<T extends (...args: any[]) => any> = T extends (...args: any[]) => (infer U extends string) ? ["string", U] : T extends (...args: any[]) => (infer U extends number) ? ["number", U] : never;
type X3_T1 = X3<() => "a">;
type X3_T2 = X3<() => 1>;
type X3_T3 = X3<() => object>;
type X4<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => (infer U extends {
    a: string;
}) ? ["string", U] : T extends new (...args: any[]) => (infer U extends {
    a: number;
}) ? ["number", U] : never;
type X4_T1 = X4<new () => {
    a: "a";
}>;
type X4_T2 = X4<new () => {
    a: 1;
}>;
type X4_T3 = X4<new () => {
    a: object;
}>;
type X5<T> = T extends Promise<infer U extends string> ? ["string", U] : T extends Promise<infer U extends number> ? ["number", U] : never;
type X5_T1 = X5<Promise<"a" | "b">>;
type X5_T2 = X5<Promise<1 | 2>>;
type X5_T3 = X5<Promise<1n | 2n>>;
type X6<T> = T extends {
    a: infer U extends string;
} ? ["string", U] : T extends {
    a: infer U extends number;
} ? ["number", U] : never;
type X6_T1 = X6<{
    a: "a";
}>;
type X6_T2 = X6<{
    a: 1;
}>;
type X6_T3 = X6<{
    a: object;
}>;
type X7<T> = T extends {
    a: infer U extends string;
    b: infer U extends string;
} ? ["string", U] : T extends {
    a: infer U extends number;
    b: infer U extends number;
} ? ["number", U] : never;
type X7_T1 = X7<{
    a: "a";
    b: "b";
}>;
type X7_T2 = X7<{
    a: 1;
    b: 2;
}>;
type X7_T3 = X7<{
    a: object;
    b: object;
}>;
type X7_T4 = X7<{
    a: "a";
    b: 1;
}>;
type X8<T> = T extends {
    a: infer U extends string;
    b: infer U;
} ? ["string", U] : T extends {
    a: infer U extends number;
    b: infer U;
} ? ["number", U] : never;
type X8_T1 = X8<{
    a: "a";
    b: "b";
}>;
type X8_T2 = X8<{
    a: 1;
    b: 2;
}>;
type X8_T3 = X8<{
    a: object;
    b: object;
}>;
type X8_T4 = X8<{
    a: "a";
    b: 1;
}>;
type X9<T> = T extends {
    a: infer U;
    b: infer U extends string;
} ? ["string", U] : T extends {
    a: infer U;
    b: infer U extends number;
} ? ["number", U] : never;
type X9_T1 = X9<{
    a: "a";
    b: "b";
}>;
type X9_T2 = X9<{
    a: 1;
    b: 2;
}>;
type X9_T3 = X9<{
    a: object;
    b: object;
}>;
type X9_T4 = X9<{
    a: "a";
    b: 1;
}>;
type X10<T> = T extends (infer U extends number ? 1 : 0) ? 1 : 0;
type X10_Y1<T> = X10<T extends number ? 1 : 0>;
type X10_T1_T1 = X10_Y1<number>;
type X11<T> = T extends ((infer U) extends number ? 1 : 0) ? 1 : 0;
type X12<T> = T extends (infer U extends number) ? 1 : 0;
type X13<T> = T extends infer U extends number ? 1 : 0;
type X14<T> = T extends keyof infer U extends number ? 1 : 0;
type X15<T> = T extends {
    [P in infer U extends keyof T ? 1 : 0]: 1;
} ? 1 : 0;
type X16<T> = T extends {
    [P in infer U extends keyof T]: 1;
} ? 1 : 0;
type X17<T> = T extends {
    [P in keyof T as infer U extends P ? 1 : 0]: 1;
} ? 1 : 0;
type X18<T> = T extends {
    [P in keyof T as infer U extends P]: 1;
} ? 1 : 0;
type X19<T extends string | number> = T extends (infer U extends number) ? [T, U] : never;
type X19_T1 = X19<"a">;
type X19_T2 = X19<1>;
type X19_T3 = X19<1 | "a">;
type X20<T> = T extends (infer U extends number) ? T extends (infer V extends U) ? [T, U, V] : never : never;
type X20_T1 = X20<1 | "a">;
type X21<T, N extends number> = T extends (infer U extends N) ? [T, U] : never;
type X21_T1 = X21<1, 1>;
type X21_T2 = X21<1 | "a", 1>;
type X21_T3 = X21<1 | 2, 1>;
type X21_T4 = X21<1 | 2, 2 | 3>;
type X21_T5 = X21<1 | 2, 3>;
type IfEquals<X, Y, A, B> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? A : B;
declare const x1: <T>() => (T extends infer U extends number ? 1 : 0);
declare function f1(): <T>() => (T extends infer U extends number ? 1 : 0);
type ExpectNumber<T extends number> = T;
declare const x2: <T>() => (T extends ExpectNumber<infer U> ? 1 : 0);
declare function f2(): <T>() => (T extends ExpectNumber<infer U> ? 1 : 0);
