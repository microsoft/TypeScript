// @strict: true
// @declaration: true

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
    T extends (...args: any[]) => infer U extends string ? ["string", U] :
    T extends (...args: any[]) => infer U extends number ? ["number", U] :
    never;

type X3_T1 = X3<() => "a">; // ["string", "a"]
type X3_T2 = X3<() => 1>; // ["number", 1]
type X3_T3 = X3<() => object>; // never

// infer to instance type
type X4<T extends new (...args: any[]) => any> =
    T extends new (...args: any[]) => infer U extends { a: string } ? ["string", U] :
    T extends new (...args: any[]) => infer U extends { a: number } ? ["number", U] :
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
