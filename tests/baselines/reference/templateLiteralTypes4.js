//// [templateLiteralTypes4.ts]
type Is<T extends U, U> = T;

type T0 = "100" extends `${Is<infer N, number>}` ? N : never; // 100
type T1 = "-100" extends `${Is<infer N, number>}` ? N : never; // -100
type T2 = "1.1" extends `${Is<infer N, number>}` ? N : never; // 1.1
type T3 = "8e-11" extends `${Is<infer N, number>}` ? N : never; // 8e-11 (0.00000000008)
type T4 = "0x10" extends `${Is<infer N, number>}` ? N : never; // number (not round-trippable)
type T5 = "0o10" extends `${Is<infer N, number>}` ? N : never; // number (not round-trippable)
type T6 = "0b10" extends `${Is<infer N, number>}` ? N : never; // number (not round-trippable)
type T7 = "10e2" extends `${Is<infer N, number>}` ? N : never; // number (not round-trippable)
type T8 = "abcd" extends `${Is<infer N, number>}` ? N : never; // never

type T10 = "100" extends `${Is<infer N, bigint>}` ? N : never; // 100n
type T11 = "-100" extends `${Is<infer N, bigint>}` ? N : never; // -100n
type T12 = "0x10" extends `${Is<infer N, bigint>}` ? N : never; // bigint (not round-trippable)
type T13 = "0o10" extends `${Is<infer N, bigint>}` ? N : never; // bigint (not round-trippable)
type T14 = "0b10" extends `${Is<infer N, bigint>}` ? N : never; // bigint (not round-trippable)
type T15 = "1.1" extends `${Is<infer N, bigint>}` ? N : never; // never
type T16 = "10e2" extends `${Is<infer N, bigint>}` ? N : never; // never
type T17 = "abcd" extends `${Is<infer N, bigint>}` ? N : never; // never

type T20 = "true" extends `${Is<infer T, boolean>}` ? T : never; // true
type T21 = "false" extends `${Is<infer T, boolean>}` ? T : never; // false
type T22 = "abcd" extends `${Is<infer T, boolean>}` ? T : never; // never

type T30 = "null" extends `${Is<infer T, null>}` ? T : never; // null
type T31 = "abcd" extends `${Is<infer T, null>}` ? T : never; // never

type T40 = "undefined" extends `${Is<infer T, undefined>}` ? T : never; // undefined
type T41 = "abcd" extends `${Is<infer T, undefined>}` ? T : never; // never

type T500 = "100" extends `${Is<infer T, string | number | bigint>}` ? T : never; // "100"
type T501 = "100" extends `${Is<infer T, number | bigint>}` ? T : never; // 100
type T502 = "100" extends `${Is<infer T, bigint>}` ? T : never; // 100n
type T503 = "100" extends `${Is<infer T, "100" | number>}` ? T : never; // "100"
type T504 = "100" extends `${Is<infer T, "101" | number>}` ? T : never; // 100

type T510 = "1.1" extends `${Is<infer T, string | number | bigint>}` ? T : never; // "1.1"
type T511 = "1.1" extends `${Is<infer T, number | bigint>}` ? T : never; // 1.1
type T512 = "1.1" extends `${Is<infer T, bigint>}` ? T : never; // never

type T520 = "true" extends `${Is<infer T, string | boolean>}` ? T : never; // "true"
type T521 = "true" extends `${Is<infer T, boolean>}` ? T : never; // true

type T530 = "false" extends `${Is<infer T, string | boolean>}` ? T : never; // "false"
type T531 = "false" extends `${Is<infer T, boolean>}` ? T : never; // false

type T540 = "null" extends `${Is<infer T, string | null>}` ? T : never; // "null"
type T541 = "null" extends `${Is<infer T, string | null>}` ? T : never; // null

type T550 = "undefined" extends `${Is<infer T, string | undefined>}` ? T : never; // "undefined"
type T551 = "undefined" extends `${Is<infer T, undefined>}` ? T : never; // undefined

type T560 = "100000000000000000000000" extends `${Is<infer T, number | bigint>}` ? T : never; // 100000000000000000000000n
type T561 = "100000000000000000000000" extends `${Is<infer T, number>}` ? T : never; // number

type ExtractPrimitives<T extends string> =
    | T
    | (T extends `${Is<infer U, number>}` ? U : never)
    | (T extends `${Is<infer U, bigint>}` ? U : never)
    | (T extends `${Is<infer U, boolean | null | undefined>}` ? U : never)
    ;

// Type writer doesn't show the union that is produced, so we use a helper type to verify constraints
type T570 = ExtractPrimitives<"100">;
type CheckT570 = Is<"100" | 100 | 100n, T570>;

type T571 = ExtractPrimitives<"1.1">;
type CheckT571 = Is<"1.1" | 1.1, T571>;

type T572 = ExtractPrimitives<"true">;
type CheckT572 = Is<"true" | true, T572>;

type NumberFor<S extends string> = S extends `${Is<infer N, number>}` ? N : never;
type T60 = NumberFor<"100">; // 100
type T61 = NumberFor<any>; // never
type T62 = NumberFor<never>; // never

// example use case:
interface FieldDefinition {
    readonly name: string;
    readonly type: "i8" | "i16" | "i32" | "i64" | "u8" | "u16" | "u32" | "u64" | "f32" | "f64";
}

type FieldType<T extends FieldDefinition["type"]> =
    T extends "i8" | "i16" | "i32" | "u8" | "u16" | "u32" | "f32" | "f64" ? number :
    T extends "f32" | "f64" ? bigint :
    never;

// Generates named members like `{ x: number, y: bigint }` from `[{ name: "x", type: "i32" }, { name: "y", type: "i64" }]`
type TypedObjectNamedMembers<TDef extends readonly FieldDefinition[]> = {
    [P in TDef[number]["name"]]: FieldType<Extract<TDef[number], { readonly name: P }>["type"]>;
};

// Generates ordinal members like `{ 0: number, 1: bigint }` from `[{ name: "x", type: "i32" }, { name: "y", type: "i64" }]`
type TypedObjectOrdinalMembers<TDef extends readonly FieldDefinition[]> = {
    [I in Extract<keyof TDef, `${number}`>]: FieldType<Extract<TDef[I], FieldDefinition>["type"]>;
};

// Default members
interface TypedObjectMembers<TDef extends readonly FieldDefinition[]> {
    // get/set a field by name
    get<K extends TDef[number]["name"]>(key: K): FieldType<Extract<TDef[number], { readonly name: K }>["type"]>;
    set<K extends TDef[number]["name"]>(key: K, value: FieldType<Extract<TDef[number], { readonly name: K }>["type"]>): void;

    // get/set a field by index
    getIndex<I extends IndicesOf<TDef>>(index: I): FieldType<Extract<TDef[I], FieldDefinition>["type"]>;
    setIndex<I extends IndicesOf<TDef>>(index: I, value: FieldType<Extract<TDef[I], FieldDefinition>["type"]>): void;
}

// Use constrained `infer` in template literal to get ordinal indices as numbers:
type IndicesOf<T> = NumberFor<Extract<keyof T, string>>; // ordinal indices as number literals

type TypedObject<TDef extends readonly FieldDefinition[]> =
    & TypedObjectMembers<TDef>
    & TypedObjectNamedMembers<TDef>
    & TypedObjectOrdinalMembers<TDef>;

// NOTE: type would normally be created from something like `const Point = TypedObject([...])` from which we would infer the type
type Point = TypedObject<[
    { name: "x", type: "f64" },
    { name: "y", type: "f64" },
]>;

declare const p: Point;
p.getIndex(0); // ok, 0 is a valid index
p.getIndex(1); // ok, 1 is a valid index
p.getIndex(2); // error, 2 is not a valid index

p.setIndex(0, 0); // ok, 0 is a valid index
p.setIndex(1, 0); // ok, 1 is a valid index
p.setIndex(2, 3); // error, 2 is not a valid index

declare function f1<T extends string | number>(s: `**${T}**`): T;
f1("**123**"); // "123"

declare function f2<T extends number>(s: `**${T}**`): T;
f2("**123**"); // 123

declare function f3<T extends bigint>(s: `**${T}**`): T;
f3("**123**"); // 123n

declare function f4<T extends boolean>(s: `**${T}**`): T;
f4("**true**"); // true | "true"
f4("**false**"); // false | "false"


//// [templateLiteralTypes4.js]
"use strict";
p.getIndex(0); // ok, 0 is a valid index
p.getIndex(1); // ok, 1 is a valid index
p.getIndex(2); // error, 2 is not a valid index
p.setIndex(0, 0); // ok, 0 is a valid index
p.setIndex(1, 0); // ok, 1 is a valid index
p.setIndex(2, 3); // error, 2 is not a valid index
f1("**123**"); // "123"
f2("**123**"); // 123
f3("**123**"); // 123n
f4("**true**"); // true | "true"
f4("**false**"); // false | "false"


//// [templateLiteralTypes4.d.ts]
declare type Is<T extends U, U> = T;
declare type T0 = "100" extends `${Is<infer N, number>}` ? N : never;
declare type T1 = "-100" extends `${Is<infer N, number>}` ? N : never;
declare type T2 = "1.1" extends `${Is<infer N, number>}` ? N : never;
declare type T3 = "8e-11" extends `${Is<infer N, number>}` ? N : never;
declare type T4 = "0x10" extends `${Is<infer N, number>}` ? N : never;
declare type T5 = "0o10" extends `${Is<infer N, number>}` ? N : never;
declare type T6 = "0b10" extends `${Is<infer N, number>}` ? N : never;
declare type T7 = "10e2" extends `${Is<infer N, number>}` ? N : never;
declare type T8 = "abcd" extends `${Is<infer N, number>}` ? N : never;
declare type T10 = "100" extends `${Is<infer N, bigint>}` ? N : never;
declare type T11 = "-100" extends `${Is<infer N, bigint>}` ? N : never;
declare type T12 = "0x10" extends `${Is<infer N, bigint>}` ? N : never;
declare type T13 = "0o10" extends `${Is<infer N, bigint>}` ? N : never;
declare type T14 = "0b10" extends `${Is<infer N, bigint>}` ? N : never;
declare type T15 = "1.1" extends `${Is<infer N, bigint>}` ? N : never;
declare type T16 = "10e2" extends `${Is<infer N, bigint>}` ? N : never;
declare type T17 = "abcd" extends `${Is<infer N, bigint>}` ? N : never;
declare type T20 = "true" extends `${Is<infer T, boolean>}` ? T : never;
declare type T21 = "false" extends `${Is<infer T, boolean>}` ? T : never;
declare type T22 = "abcd" extends `${Is<infer T, boolean>}` ? T : never;
declare type T30 = "null" extends `${Is<infer T, null>}` ? T : never;
declare type T31 = "abcd" extends `${Is<infer T, null>}` ? T : never;
declare type T40 = "undefined" extends `${Is<infer T, undefined>}` ? T : never;
declare type T41 = "abcd" extends `${Is<infer T, undefined>}` ? T : never;
declare type T500 = "100" extends `${Is<infer T, string | number | bigint>}` ? T : never;
declare type T501 = "100" extends `${Is<infer T, number | bigint>}` ? T : never;
declare type T502 = "100" extends `${Is<infer T, bigint>}` ? T : never;
declare type T503 = "100" extends `${Is<infer T, "100" | number>}` ? T : never;
declare type T504 = "100" extends `${Is<infer T, "101" | number>}` ? T : never;
declare type T510 = "1.1" extends `${Is<infer T, string | number | bigint>}` ? T : never;
declare type T511 = "1.1" extends `${Is<infer T, number | bigint>}` ? T : never;
declare type T512 = "1.1" extends `${Is<infer T, bigint>}` ? T : never;
declare type T520 = "true" extends `${Is<infer T, string | boolean>}` ? T : never;
declare type T521 = "true" extends `${Is<infer T, boolean>}` ? T : never;
declare type T530 = "false" extends `${Is<infer T, string | boolean>}` ? T : never;
declare type T531 = "false" extends `${Is<infer T, boolean>}` ? T : never;
declare type T540 = "null" extends `${Is<infer T, string | null>}` ? T : never;
declare type T541 = "null" extends `${Is<infer T, string | null>}` ? T : never;
declare type T550 = "undefined" extends `${Is<infer T, string | undefined>}` ? T : never;
declare type T551 = "undefined" extends `${Is<infer T, undefined>}` ? T : never;
declare type T560 = "100000000000000000000000" extends `${Is<infer T, number | bigint>}` ? T : never;
declare type T561 = "100000000000000000000000" extends `${Is<infer T, number>}` ? T : never;
declare type ExtractPrimitives<T extends string> = T | (T extends `${Is<infer U, number>}` ? U : never) | (T extends `${Is<infer U, bigint>}` ? U : never) | (T extends `${Is<infer U, boolean | null | undefined>}` ? U : never);
declare type T570 = ExtractPrimitives<"100">;
declare type CheckT570 = Is<"100" | 100 | 100n, T570>;
declare type T571 = ExtractPrimitives<"1.1">;
declare type CheckT571 = Is<"1.1" | 1.1, T571>;
declare type T572 = ExtractPrimitives<"true">;
declare type CheckT572 = Is<"true" | true, T572>;
declare type NumberFor<S extends string> = S extends `${Is<infer N, number>}` ? N : never;
declare type T60 = NumberFor<"100">;
declare type T61 = NumberFor<any>;
declare type T62 = NumberFor<never>;
interface FieldDefinition {
    readonly name: string;
    readonly type: "i8" | "i16" | "i32" | "i64" | "u8" | "u16" | "u32" | "u64" | "f32" | "f64";
}
declare type FieldType<T extends FieldDefinition["type"]> = T extends "i8" | "i16" | "i32" | "u8" | "u16" | "u32" | "f32" | "f64" ? number : T extends "f32" | "f64" ? bigint : never;
declare type TypedObjectNamedMembers<TDef extends readonly FieldDefinition[]> = {
    [P in TDef[number]["name"]]: FieldType<Extract<TDef[number], {
        readonly name: P;
    }>["type"]>;
};
declare type TypedObjectOrdinalMembers<TDef extends readonly FieldDefinition[]> = {
    [I in Extract<keyof TDef, `${number}`>]: FieldType<Extract<TDef[I], FieldDefinition>["type"]>;
};
interface TypedObjectMembers<TDef extends readonly FieldDefinition[]> {
    get<K extends TDef[number]["name"]>(key: K): FieldType<Extract<TDef[number], {
        readonly name: K;
    }>["type"]>;
    set<K extends TDef[number]["name"]>(key: K, value: FieldType<Extract<TDef[number], {
        readonly name: K;
    }>["type"]>): void;
    getIndex<I extends IndicesOf<TDef>>(index: I): FieldType<Extract<TDef[I], FieldDefinition>["type"]>;
    setIndex<I extends IndicesOf<TDef>>(index: I, value: FieldType<Extract<TDef[I], FieldDefinition>["type"]>): void;
}
declare type IndicesOf<T> = NumberFor<Extract<keyof T, string>>;
declare type TypedObject<TDef extends readonly FieldDefinition[]> = TypedObjectMembers<TDef> & TypedObjectNamedMembers<TDef> & TypedObjectOrdinalMembers<TDef>;
declare type Point = TypedObject<[
    {
        name: "x";
        type: "f64";
    },
    {
        name: "y";
        type: "f64";
    }
]>;
declare const p: Point;
declare function f1<T extends string | number>(s: `**${T}**`): T;
declare function f2<T extends number>(s: `**${T}**`): T;
declare function f3<T extends bigint>(s: `**${T}**`): T;
declare function f4<T extends boolean>(s: `**${T}**`): T;
