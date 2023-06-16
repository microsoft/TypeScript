//// [tests/cases/compiler/strictSubtypeAndNarrowing.ts] ////

//// [strictSubtypeAndNarrowing.ts]
// Check that `any` is a strict supertype of `unknown`

declare const x11: { x: unknown };
declare const x12: { x: any };

const a11 = [x11, x12];
const a12 = [x12, x11];

declare const x21: { x: any };
declare const x22: { x: unknown };

const a21 = [x22, x21];
const a22 = [x21, x22];

// Strict subtype doesn't infer index signatures in non-fresh object types

const x31 = { a: 1 };
declare const x32: { [x: string]: unknown, a: number }

const a31 = [x31, x32];
const a32 = [x32, x31];

declare const x41: { [x: string]: unknown, a: number }
const x42 = { a: 1 };

const a41 = [x42, x41];
const a42 = [x41, x42];

// (...args: A) => R, where A is any, any[], never, or never[] and R is any or unknown, is supertype of all function types.

declare function isFunction<T>(x: unknown): x is T;

type A = (...args: any) => unknown;
type B = (...args: any[]) => unknown;
type C = (...args: never) => unknown;
type D = (...args: never[]) => unknown;

type FnTypes = A | B | C | D;

function fx1(f: (() => void) | undefined) {
    if (isFunction<A>(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
}

function fx2(f: (() => void) | undefined) {
    if (isFunction<B>(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
}

function fx3(f: (() => void) | undefined) {
    if (isFunction<C>(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
}

function fx4(f: (() => void) | undefined) {
    if (isFunction<D>(f)) {
        f;  // () => void
    }
    else {
        f;  // undefined
    }
    f;  // (() => void) | undefined
}

function checkA(f: FnTypes) {
    if (isFunction<A>(f)) {
        f;  // A | B
    }
    else {
        f;  // C | D
    }
    f;  // FnTypes
}

function checkB(f: FnTypes) {
    if (isFunction<B>(f)) {
        f;  // A | B
    }
    else {
        f;  // C | D
    }
    f;  // FnTypes
}

function checkC(f: FnTypes) {
    if (isFunction<C>(f)) {
        f;  // FnTypes
    }
    else {
        f;  // never
    }
    f;  // FnTypes
}

function checkD(f: FnTypes) {
    if (isFunction<C>(f)) {
        f;  // FnTypes
    }
    else {
        f;  // never
    }
    f;  // FnTypes
}

// Type of x = y is y with freshness preserved

function fx10(obj1: { x?: number }, obj2: { x?: number, y?: number }) {
    obj1 = obj2 = { x: 1, y: 2 };
    obj2 = obj1 = { x: 1, y: 2 };
}

function fx11(): { x?: number } {
    let obj: { x?: number, y?: number };
    return obj = { x: 1, y: 2 };
}

// Repros from #52827

declare function isArrayLike(value: any): value is { length: number };

function ff1(value: { [index: number]: boolean, length: number } | undefined) {
    if (isArrayLike(value)) {
        value;
    } else {
        value;
    }
    value;
}

function ff2(value: { [index: number]: boolean, length: number } | string) {
    if (isArrayLike(value)) {
        value;
    } else {
        value;
    }
    value;
}

function ff3(value: string | string[] | { [index: number]: boolean, length: number } | [number, boolean] | number | { length: string } | { a: string } | null | undefined) {
    if (isArrayLike(value)) {
        value;
    } else {
        value;
    }
    value;
}

// Repro from comment in #52984

type DistributedKeyOf<T> = T extends unknown ? keyof T : never;

type NarrowByKeyValue<ObjT, KeyT extends PropertyKey, ValueT> = ObjT extends unknown
    ? KeyT extends keyof ObjT
        ? ValueT extends ObjT[KeyT]
            ? ObjT & Readonly<Record<KeyT, ValueT>>
            : never
        : never
    : never;

type NarrowByDeepValue<ObjT, DeepPathT, ValueT> = DeepPathT extends readonly [
    infer Head extends DistributedKeyOf<ObjT>,
]
    ? NarrowByKeyValue<ObjT, Head, ValueT>
    : DeepPathT extends readonly [infer Head extends DistributedKeyOf<ObjT>, ...infer Rest]
    ? NarrowByKeyValue<ObjT, Head, NarrowByDeepValue<NonNullable<ObjT[Head]>, Rest, ValueT>>
    : never;


declare function doesValueAtDeepPathSatisfy<
    ObjT extends object,
    const DeepPathT extends ReadonlyArray<number | string>,
    ValueT,
>(
    obj: ObjT,
    deepPath: DeepPathT,
    predicate: (arg: unknown) => arg is ValueT,
): obj is NarrowByDeepValue<ObjT, DeepPathT, ValueT>;


type Foo = {value: {type: 'A'}; a?: number} | {value: {type: 'B'}; b?: number};

declare function isA(arg: unknown): arg is 'A';
declare function isB(arg: unknown): arg is 'B';

declare function assert(condition: boolean): asserts condition;

function test1(foo: Foo): {value: {type: 'A'}; a?: number} {
    assert(doesValueAtDeepPathSatisfy(foo, ['value', 'type'], isA));
    return foo;
}

function test2(foo: Foo): {value: {type: 'A'}; a?: number} {
    assert(!doesValueAtDeepPathSatisfy(foo, ['value', 'type'], isB));
    return foo;
}

// Repro from #53063

interface Free {
    premium: false;
}

interface Premium {
    premium: true;
}

type Union = { premium: false } | { premium: true };

declare const checkIsPremium: (a: Union) => a is Union & Premium;

const f = (value: Union) => {
    if (!checkIsPremium(value)) {
        value.premium;
    }
};


//// [strictSubtypeAndNarrowing.js]
"use strict";
// Check that `any` is a strict supertype of `unknown`
var a11 = [x11, x12];
var a12 = [x12, x11];
var a21 = [x22, x21];
var a22 = [x21, x22];
// Strict subtype doesn't infer index signatures in non-fresh object types
var x31 = { a: 1 };
var a31 = [x31, x32];
var a32 = [x32, x31];
var x42 = { a: 1 };
var a41 = [x42, x41];
var a42 = [x41, x42];
function fx1(f) {
    if (isFunction(f)) {
        f; // () => void
    }
    else {
        f; // undefined
    }
    f; // (() => void) | undefined
}
function fx2(f) {
    if (isFunction(f)) {
        f; // () => void
    }
    else {
        f; // undefined
    }
    f; // (() => void) | undefined
}
function fx3(f) {
    if (isFunction(f)) {
        f; // () => void
    }
    else {
        f; // undefined
    }
    f; // (() => void) | undefined
}
function fx4(f) {
    if (isFunction(f)) {
        f; // () => void
    }
    else {
        f; // undefined
    }
    f; // (() => void) | undefined
}
function checkA(f) {
    if (isFunction(f)) {
        f; // A | B
    }
    else {
        f; // C | D
    }
    f; // FnTypes
}
function checkB(f) {
    if (isFunction(f)) {
        f; // A | B
    }
    else {
        f; // C | D
    }
    f; // FnTypes
}
function checkC(f) {
    if (isFunction(f)) {
        f; // FnTypes
    }
    else {
        f; // never
    }
    f; // FnTypes
}
function checkD(f) {
    if (isFunction(f)) {
        f; // FnTypes
    }
    else {
        f; // never
    }
    f; // FnTypes
}
// Type of x = y is y with freshness preserved
function fx10(obj1, obj2) {
    obj1 = obj2 = { x: 1, y: 2 };
    obj2 = obj1 = { x: 1, y: 2 };
}
function fx11() {
    var obj;
    return obj = { x: 1, y: 2 };
}
function ff1(value) {
    if (isArrayLike(value)) {
        value;
    }
    else {
        value;
    }
    value;
}
function ff2(value) {
    if (isArrayLike(value)) {
        value;
    }
    else {
        value;
    }
    value;
}
function ff3(value) {
    if (isArrayLike(value)) {
        value;
    }
    else {
        value;
    }
    value;
}
function test1(foo) {
    assert(doesValueAtDeepPathSatisfy(foo, ['value', 'type'], isA));
    return foo;
}
function test2(foo) {
    assert(!doesValueAtDeepPathSatisfy(foo, ['value', 'type'], isB));
    return foo;
}
var f = function (value) {
    if (!checkIsPremium(value)) {
        value.premium;
    }
};
