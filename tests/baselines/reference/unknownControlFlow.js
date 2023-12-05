//// [tests/cases/conformance/types/unknown/unknownControlFlow.ts] ////

//// [unknownControlFlow.ts]
type T01 = {} & string;  // {} & string
type T02 = {} & 'a';  // 'a'
type T03 = {} & object;  // object
type T04 = {} & { x: number };  // { x: number }
type T05 = {} & null;  // never
type T06 = {} & undefined;  // never
type T07 = undefined & void;  // undefined

type T10 = string & {};  // Specially preserved
type T11 = number & {};  // Specially preserved
type T12 = bigint & {};  // Specially preserved

type ThisNode = {};
type ThatNode = {};
type ThisOrThatNode = ThisNode | ThatNode;

function f01(u: unknown) {
    let x1: {} = u;  // Error
    let x2: {} | null | undefined = u;
    let x3: {} | { x: string } | null | undefined = u;
    let x4: ThisOrThatNode | null | undefined = u;
}

function f10(x: unknown) {
    if (x) {
        x;  // {}
    }
    else {
        x;  // unknown
    }
    if (!x) {
        x;  // unknown
    }
    else {
        x;  // {}
    }
}

function f11<T>(x: T) {
    if (x) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (!x) {
        x;  // T
    }
    else {
        x;  // T & {}
    }
}

function f12<T extends {}>(x: T) {
    if (x) {
        x;  // T
    }
    else {
        x;  // T
    }
}

function f20(x: unknown) {
    if (x !== undefined) {
        x;  // {} | null
    }
    else {
        x;  // undefined
    }
    if (x !== null) {
        x;  // {} | undefined
    }
    else {
        x;  // null
    }
    if (x !== undefined && x !== null) {
        x;  // {}
    }
    else {
        x;  // null | undefined
    }
    if (x != undefined) {
        x;  // {}
    }
    else {
        x;  // null | undefined
    }
    if (x != null) {
        x;  // {}
    }
    else {
        x;  // null | undefined
    }
}

function f21<T>(x: T) {
    if (x !== undefined) {
        x;  // T & ({} | null)
    }
    else {
        x;  // T
    }
    if (x !== null) {
        x;  // T & ({} | undefined)
    }
    else {
        x;  // T
    }
    if (x !== undefined && x !== null) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x != undefined) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x != null) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
}

function f22<T extends {} | undefined>(x: T) {
    if (x !== undefined) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x !== null) {
        x;  // T
    }
    else {
        x;  // T
    }
    if (x !== undefined && x !== null) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x != undefined) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
    if (x != null) {
        x;  // T & {}
    }
    else {
        x;  // T
    }
}

function f23<T>(x: T | undefined | null) {
    if (x !== undefined) {
        x;  // T & {} | null
    }
    if (x !== null) {
        x;  // T & {} | undefined
    }
    if (x != undefined) {
        x;  // T & {}
    }
    if (x != null) {
        x;  // T & {}
    }
}

function f30(x: {}) {
    if (typeof x === "object") {
        x;  // object
    }
}

function f31<T>(x: T) {
    if (typeof x === "object") {
        x;  // T & object | T & null
    }
    if (x && typeof x === "object") {
        x;  // T & object
    }
    if (typeof x === "object" && x) {
        x;  // T & object
    }
}

function f32<T extends {} | undefined>(x: T) {
    if (typeof x === "object") {
        x;  // T & object
    }
}

function possiblyNull<T>(x: T) {
    return !!true ? x : null;  // T | null
}

function possiblyUndefined<T>(x: T) {
    return !!true ? x : undefined;  // T | undefined
}

function possiblyNullOrUndefined<T>(x: T) {
    return possiblyUndefined(possiblyNull(x));  // T | null | undefined
}

function ensureNotNull<T>(x: T) {
    if (x === null) throw Error();
    return x;  // T & ({} | undefined)
}

function ensureNotUndefined<T>(x: T) {
    if (x === undefined) throw Error();
    return x;  // T & ({} | null)
}

function ensureNotNullOrUndefined<T>(x: T) {
    return ensureNotUndefined(ensureNotNull(x));  // T & {}
}

function f40(a: string | undefined, b: number | null | undefined) {
    let a1 = ensureNotNullOrUndefined(a);  // string
    let b1 = ensureNotNullOrUndefined(b);  // number
}

type QQ<T> = NonNullable<NonNullable<NonNullable<T>>>;

function f41<T>(a: T) {
    let a1 = ensureNotUndefined(ensureNotNull(a));  // T & {}
    let a2 = ensureNotNull(ensureNotUndefined(a));  // T & {}
    let a3 = ensureNotNull(ensureNotNull(a));  // T & {} | T & undefined
    let a4 = ensureNotUndefined(ensureNotUndefined(a));  // T & {} | T & null
    let a5 = ensureNotNullOrUndefined(ensureNotNullOrUndefined(a));  // T & {}
    let a6 = ensureNotNull(possiblyNullOrUndefined(a));  // T & {} | undefined
    let a7 = ensureNotUndefined(possiblyNullOrUndefined(a));  // T & {} | null
    let a8 = ensureNotNull(possiblyUndefined(a));  // T & {} | undefined
    let a9 = ensureNotUndefined(possiblyNull(a));  // T & {} | null
}

// Repro from #48468

function deepEquals<T>(a: T, b: T): boolean {
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
        return false;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        return false;
    }
    if (Object.keys(a).length !== Object.keys(b).length) { // Error here
        return false;
    }
    return true;
}

// Repro from #49386

function foo<T>(x: T | null) {
    let y = x;
    if (y !== null) {
        y;
    }
}

// We allow an unconstrained object of a generic type `T` to be indexed by a key of type `keyof T`
// without a check that the object is non-undefined and non-null. This is safe because `keyof T`
// is `never` (meaning no possible keys) for any `T` that includes `undefined` or `null`.

function ff1<T>(t: T, k: keyof T) {
    t[k];
}

function ff2<T>(t: T & {}, k: keyof T) {
    t[k];
}

function ff3<T>(t: T, k: keyof (T & {})) {
    t[k];  // Error
}

function ff4<T>(t: T & {}, k: keyof (T & {})) {
    t[k];
}

ff1(null, 'foo');  // Error
ff2(null, 'foo');  // Error
ff3(null, 'foo');
ff4(null, 'foo');  // Error

// Repro from #49681

type Foo = { [key: string]: unknown };
type NullableFoo = Foo | undefined;

type Bar<T extends NullableFoo> = NonNullable<T>[string];

// Generics and intersections with {}

function fx0<T>(value: T & ({} | null)) {
    if (value === 42) {
        value;  // T & {}
    }
    else {
        value;  // T & ({} | null)
    }
}

function fx1<T extends unknown>(value: T & ({} | null)) {
    if (value === 42) {
        value;  // T & {}
    }
    else {
        value;  // T & ({} | null)
    }
}

function fx2<T extends {}>(value: T & ({} | null)) {
    if (value === 42) {
        value;  // T & {}
    }
    else {
        value;  // T & ({} | null)
    }
}

function fx3<T extends {} | undefined>(value: T & ({} | null)) {
    if (value === 42) {
        value;  // T & {}
    }
    else {
        value;  // T & ({} | null)
    }
}

function fx4<T extends {} | null>(value: T & ({} | null)) {
    if (value === 42) {
        value;  // T & {}
    }
    else {
        value;  // T & ({} | null)
    }
}

function fx5<T extends {} | null | undefined>(value: T & ({} | null)) {
    if (value === 42) {
        value;  // T & {}
    }
    else {
        value;  // T & ({} | null)
    }
}

// Double-equals narrowing

function fx10(x: string | number, y: number) {
    if (x == y) {
        x;  // string | number
    }
    else {
        x;  // string | number
    }
    if (x != y) {
        x;  // string | number
    }
    else {
        x;  // string | number
    }
}

// Repros from #50706

function SendBlob(encoding: unknown) {
    if (encoding !== undefined && encoding !== 'utf8') {
        throw new Error('encoding');
    }
    encoding;
};

function doSomething1<T extends unknown>(value: T): T {
    if (value === undefined) {
        return value;
    }
    if (value === 42) {
        throw Error('Meaning of life value');
    }
    return value;
}

function doSomething2(value: unknown): void {
    if (value === undefined) {
        return;
    }
    if (value === 42) {
        value;
    }
}

// Repro from #51009

type TypeA = {
    A: 'A',
    B: 'B',
}

type TypeB = {
    A: 'A',
    B: 'B',
    C: 'C',
}

type R<T extends keyof TypeA> =
    T extends keyof TypeB ? [TypeA[T], TypeB[T]] : never;

type R2<T extends PropertyKey> =
    T extends keyof TypeA ? T extends keyof TypeB ? [TypeA[T], TypeB[T]] : never : never;

// Repro from #51041

type AB = "A" | "B";

function x<T_AB extends AB>(x: T_AB & undefined, y: any) {
    let r2: never = y as T_AB & undefined;
} 

// Repro from #51538

type Left = 'left';
type Right = 'right' & { right: 'right' };
type Either = Left | Right;

function assertNever(v: never): never {
    throw new Error('never');
}

function fx20(value: Either) {
    if (value === 'left') {
        const foo: 'left' = value;
    }
    else if (value === 'right') {
        const bar: 'right' = value;
    }
    else {
        assertNever(value);
    }
}


//// [unknownControlFlow.js]
"use strict";
function f01(u) {
    var x1 = u; // Error
    var x2 = u;
    var x3 = u;
    var x4 = u;
}
function f10(x) {
    if (x) {
        x; // {}
    }
    else {
        x; // unknown
    }
    if (!x) {
        x; // unknown
    }
    else {
        x; // {}
    }
}
function f11(x) {
    if (x) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (!x) {
        x; // T
    }
    else {
        x; // T & {}
    }
}
function f12(x) {
    if (x) {
        x; // T
    }
    else {
        x; // T
    }
}
function f20(x) {
    if (x !== undefined) {
        x; // {} | null
    }
    else {
        x; // undefined
    }
    if (x !== null) {
        x; // {} | undefined
    }
    else {
        x; // null
    }
    if (x !== undefined && x !== null) {
        x; // {}
    }
    else {
        x; // null | undefined
    }
    if (x != undefined) {
        x; // {}
    }
    else {
        x; // null | undefined
    }
    if (x != null) {
        x; // {}
    }
    else {
        x; // null | undefined
    }
}
function f21(x) {
    if (x !== undefined) {
        x; // T & ({} | null)
    }
    else {
        x; // T
    }
    if (x !== null) {
        x; // T & ({} | undefined)
    }
    else {
        x; // T
    }
    if (x !== undefined && x !== null) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x != undefined) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x != null) {
        x; // T & {}
    }
    else {
        x; // T
    }
}
function f22(x) {
    if (x !== undefined) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x !== null) {
        x; // T
    }
    else {
        x; // T
    }
    if (x !== undefined && x !== null) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x != undefined) {
        x; // T & {}
    }
    else {
        x; // T
    }
    if (x != null) {
        x; // T & {}
    }
    else {
        x; // T
    }
}
function f23(x) {
    if (x !== undefined) {
        x; // T & {} | null
    }
    if (x !== null) {
        x; // T & {} | undefined
    }
    if (x != undefined) {
        x; // T & {}
    }
    if (x != null) {
        x; // T & {}
    }
}
function f30(x) {
    if (typeof x === "object") {
        x; // object
    }
}
function f31(x) {
    if (typeof x === "object") {
        x; // T & object | T & null
    }
    if (x && typeof x === "object") {
        x; // T & object
    }
    if (typeof x === "object" && x) {
        x; // T & object
    }
}
function f32(x) {
    if (typeof x === "object") {
        x; // T & object
    }
}
function possiblyNull(x) {
    return !!true ? x : null; // T | null
}
function possiblyUndefined(x) {
    return !!true ? x : undefined; // T | undefined
}
function possiblyNullOrUndefined(x) {
    return possiblyUndefined(possiblyNull(x)); // T | null | undefined
}
function ensureNotNull(x) {
    if (x === null)
        throw Error();
    return x; // T & ({} | undefined)
}
function ensureNotUndefined(x) {
    if (x === undefined)
        throw Error();
    return x; // T & ({} | null)
}
function ensureNotNullOrUndefined(x) {
    return ensureNotUndefined(ensureNotNull(x)); // T & {}
}
function f40(a, b) {
    var a1 = ensureNotNullOrUndefined(a); // string
    var b1 = ensureNotNullOrUndefined(b); // number
}
function f41(a) {
    var a1 = ensureNotUndefined(ensureNotNull(a)); // T & {}
    var a2 = ensureNotNull(ensureNotUndefined(a)); // T & {}
    var a3 = ensureNotNull(ensureNotNull(a)); // T & {} | T & undefined
    var a4 = ensureNotUndefined(ensureNotUndefined(a)); // T & {} | T & null
    var a5 = ensureNotNullOrUndefined(ensureNotNullOrUndefined(a)); // T & {}
    var a6 = ensureNotNull(possiblyNullOrUndefined(a)); // T & {} | undefined
    var a7 = ensureNotUndefined(possiblyNullOrUndefined(a)); // T & {} | null
    var a8 = ensureNotNull(possiblyUndefined(a)); // T & {} | undefined
    var a9 = ensureNotUndefined(possiblyNull(a)); // T & {} | null
}
// Repro from #48468
function deepEquals(a, b) {
    if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) {
        return false;
    }
    if (Array.isArray(a) || Array.isArray(b)) {
        return false;
    }
    if (Object.keys(a).length !== Object.keys(b).length) { // Error here
        return false;
    }
    return true;
}
// Repro from #49386
function foo(x) {
    var y = x;
    if (y !== null) {
        y;
    }
}
// We allow an unconstrained object of a generic type `T` to be indexed by a key of type `keyof T`
// without a check that the object is non-undefined and non-null. This is safe because `keyof T`
// is `never` (meaning no possible keys) for any `T` that includes `undefined` or `null`.
function ff1(t, k) {
    t[k];
}
function ff2(t, k) {
    t[k];
}
function ff3(t, k) {
    t[k]; // Error
}
function ff4(t, k) {
    t[k];
}
ff1(null, 'foo'); // Error
ff2(null, 'foo'); // Error
ff3(null, 'foo');
ff4(null, 'foo'); // Error
// Generics and intersections with {}
function fx0(value) {
    if (value === 42) {
        value; // T & {}
    }
    else {
        value; // T & ({} | null)
    }
}
function fx1(value) {
    if (value === 42) {
        value; // T & {}
    }
    else {
        value; // T & ({} | null)
    }
}
function fx2(value) {
    if (value === 42) {
        value; // T & {}
    }
    else {
        value; // T & ({} | null)
    }
}
function fx3(value) {
    if (value === 42) {
        value; // T & {}
    }
    else {
        value; // T & ({} | null)
    }
}
function fx4(value) {
    if (value === 42) {
        value; // T & {}
    }
    else {
        value; // T & ({} | null)
    }
}
function fx5(value) {
    if (value === 42) {
        value; // T & {}
    }
    else {
        value; // T & ({} | null)
    }
}
// Double-equals narrowing
function fx10(x, y) {
    if (x == y) {
        x; // string | number
    }
    else {
        x; // string | number
    }
    if (x != y) {
        x; // string | number
    }
    else {
        x; // string | number
    }
}
// Repros from #50706
function SendBlob(encoding) {
    if (encoding !== undefined && encoding !== 'utf8') {
        throw new Error('encoding');
    }
    encoding;
}
;
function doSomething1(value) {
    if (value === undefined) {
        return value;
    }
    if (value === 42) {
        throw Error('Meaning of life value');
    }
    return value;
}
function doSomething2(value) {
    if (value === undefined) {
        return;
    }
    if (value === 42) {
        value;
    }
}
function x(x, y) {
    var r2 = y;
}
function assertNever(v) {
    throw new Error('never');
}
function fx20(value) {
    if (value === 'left') {
        var foo_1 = value;
    }
    else if (value === 'right') {
        var bar = value;
    }
    else {
        assertNever(value);
    }
}


//// [unknownControlFlow.d.ts]
type T01 = {} & string;
type T02 = {} & 'a';
type T03 = {} & object;
type T04 = {} & {
    x: number;
};
type T05 = {} & null;
type T06 = {} & undefined;
type T07 = undefined & void;
type T10 = string & {};
type T11 = number & {};
type T12 = bigint & {};
type ThisNode = {};
type ThatNode = {};
type ThisOrThatNode = ThisNode | ThatNode;
declare function f01(u: unknown): void;
declare function f10(x: unknown): void;
declare function f11<T>(x: T): void;
declare function f12<T extends {}>(x: T): void;
declare function f20(x: unknown): void;
declare function f21<T>(x: T): void;
declare function f22<T extends {} | undefined>(x: T): void;
declare function f23<T>(x: T | undefined | null): void;
declare function f30(x: {}): void;
declare function f31<T>(x: T): void;
declare function f32<T extends {} | undefined>(x: T): void;
declare function possiblyNull<T>(x: T): T | null;
declare function possiblyUndefined<T>(x: T): T | undefined;
declare function possiblyNullOrUndefined<T>(x: T): T | null | undefined;
declare function ensureNotNull<T>(x: T): T & ({} | undefined);
declare function ensureNotUndefined<T>(x: T): T & ({} | null);
declare function ensureNotNullOrUndefined<T>(x: T): T & {};
declare function f40(a: string | undefined, b: number | null | undefined): void;
type QQ<T> = NonNullable<NonNullable<NonNullable<T>>>;
declare function f41<T>(a: T): void;
declare function deepEquals<T>(a: T, b: T): boolean;
declare function foo<T>(x: T | null): void;
declare function ff1<T>(t: T, k: keyof T): void;
declare function ff2<T>(t: T & {}, k: keyof T): void;
declare function ff3<T>(t: T, k: keyof (T & {})): void;
declare function ff4<T>(t: T & {}, k: keyof (T & {})): void;
type Foo = {
    [key: string]: unknown;
};
type NullableFoo = Foo | undefined;
type Bar<T extends NullableFoo> = NonNullable<T>[string];
declare function fx0<T>(value: T & ({} | null)): void;
declare function fx1<T extends unknown>(value: T & ({} | null)): void;
declare function fx2<T extends {}>(value: T & ({} | null)): void;
declare function fx3<T extends {} | undefined>(value: T & ({} | null)): void;
declare function fx4<T extends {} | null>(value: T & ({} | null)): void;
declare function fx5<T extends {} | null | undefined>(value: T & ({} | null)): void;
declare function fx10(x: string | number, y: number): void;
declare function SendBlob(encoding: unknown): void;
declare function doSomething1<T extends unknown>(value: T): T;
declare function doSomething2(value: unknown): void;
type TypeA = {
    A: 'A';
    B: 'B';
};
type TypeB = {
    A: 'A';
    B: 'B';
    C: 'C';
};
type R<T extends keyof TypeA> = T extends keyof TypeB ? [TypeA[T], TypeB[T]] : never;
type R2<T extends PropertyKey> = T extends keyof TypeA ? T extends keyof TypeB ? [TypeA[T], TypeB[T]] : never : never;
type AB = "A" | "B";
declare function x<T_AB extends AB>(x: T_AB & undefined, y: any): void;
type Left = 'left';
type Right = 'right' & {
    right: 'right';
};
type Either = Left | Right;
declare function assertNever(v: never): never;
declare function fx20(value: Either): void;
