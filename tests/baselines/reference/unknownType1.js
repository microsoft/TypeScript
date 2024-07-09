//// [tests/cases/conformance/types/unknown/unknownType1.ts] ////

//// [unknownType1.ts]
// In an intersection everything absorbs unknown

type T00 = unknown & null;  // null
type T01 = unknown & undefined;  // undefined
type T02 = unknown & null & undefined;  // never
type T03 = unknown & string;  // string
type T04 = unknown & string[];  // string[]
type T05 = unknown & unknown;  // unknown
type T06 = unknown & any;  // any

// In a union an unknown absorbs everything

type T10 = unknown | null;  // unknown
type T11 = unknown | undefined;  // unknown
type T12 = unknown | null | undefined;  // unknown
type T13 = unknown | string;  // unknown
type T14 = unknown | string[];  // unknown
type T15 = unknown | unknown;  // unknown
type T16 = unknown | any;  // any

// Type variable and unknown in union and intersection

type T20<T> = T & {};  // T & {}
type T21<T> = T | {};  // T | {}
type T22<T> = T & unknown;  // T
type T23<T> = T | unknown;  // unknown

// unknown in conditional types

type T30<T> = unknown extends T ? true : false;  // Deferred
type T31<T> = T extends unknown ? true : false;  // Deferred (so it distributes)
type T32<T> = never extends T ? true : false;  // true
type T33<T> = T extends never ? true : false;  // Deferred

type T35<T> = T extends unknown ? { x: T } : false;
type T36 = T35<string | number>;  // { x: string } | { x: number }
type T37 = T35<any>;  // { x: any }
type T38 = T35<unknown>;  // { x: unknown }

// keyof unknown

type T40 = keyof any;  // string | number | symbol
type T41 = keyof unknown;  // never

// Only equality operators are allowed with unknown

function f10(x: unknown) {
    x == 5;
    x !== 10;
    x >= 0;  // Error
    x.foo;  // Error
    x[10];  // Error
    x();  // Error
    x + 1;  // Error
    x * 2;  // Error
    -x;  // Error
    +x;  // Error
}

// No property accesses, element accesses, or function calls

function f11(x: unknown) {
    x.foo;  // Error
    x[5];  // Error
    x();  // Error
    new x();  // Error
}

// typeof, instanceof, and user defined type predicates

declare function isFunction(x: unknown): x is Function;

function f20(x: unknown) {
    if (typeof x === "string" || typeof x === "number") {
        x;  // string | number
    }
    if (x instanceof Error) {
        x;  // Error
    }
    if (isFunction(x)) {
        x;  // Function
    }
}

// Homomorphic mapped type over unknown

type T50<T> = { [P in keyof T]: number };
type T51 = T50<any>;  // { [x: string]: number }
type T52 = T50<unknown>;  // {}

// Anything is assignable to unknown

function f21<T>(pAny: any, pNever: never, pT: T) {
    let x: unknown;
    x = 123;
    x = "hello";
    x = [1, 2, 3];
    x = new Error();
    x = x;
    x = pAny;
    x = pNever;
    x = pT;
}

// unknown assignable only to itself and any

function f22(x: unknown) {
    let v1: any = x;
    let v2: unknown = x;
    let v3: object = x;  // Error
    let v4: string = x;  // Error
    let v5: string[] = x;  // Error
    let v6: {} = x;  // Error
    let v7: {} | null | undefined = x;  // Error
}

// Type parameter 'T extends unknown' not related to object

function f23<T extends unknown>(x: T) {
    let y: object = x;  // Error
}

// Anything fresh but primitive assignable to { [x: string]: unknown }

function f24(x: { [x: string]: unknown }) {
    x = {};
    x = { a: 5 };
    x = [1, 2, 3]; // Error
    x = 123;  // Error
}

// Locals of type unknown always considered initialized

function f25() {
    let x: unknown;
    let y = x;
}

// Spread of unknown causes result to be unknown

function f26(x: {}, y: unknown, z: any) {
    let o1 = { a: 42, ...x };  // { a: number }
    let o2 = { a: 42, ...x, ...y };  // unknown
    let o3 = { a: 42, ...x, ...y, ...z };  // any
    let o4 = { a: 42, ...z }; // any
}

// Functions with unknown return type don't need return expressions

function f27(): unknown {
}

// Rest type cannot be created from unknown

function f28(x: unknown) {
    let { ...a } = x;  // Error
}

// Class properties of type unknown don't need definite assignment

class C1 {
    a: string;  // Error
    b: unknown;
    c: any;
}

// Type parameter with explicit 'unknown' constraint not assignable to '{}'

function f30<T, U extends unknown>(t: T, u: U) {
    let x: {} = t;
    let y: {} = u;
}

// Repro from #26796

type Test1 = [unknown] extends [{}] ? true : false;  // false
type IsDefinitelyDefined<T extends unknown> = [T] extends [{}] ? true : false;
type Test2 = IsDefinitelyDefined<unknown>;  // false

function oops<T extends unknown>(arg: T): {} {
    return arg;  // Error
}


//// [unknownType1.js]
"use strict";
// In an intersection everything absorbs unknown
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// Only equality operators are allowed with unknown
function f10(x) {
    x == 5;
    x !== 10;
    x >= 0; // Error
    x.foo; // Error
    x[10]; // Error
    x(); // Error
    x + 1; // Error
    x * 2; // Error
    -x; // Error
    +x; // Error
}
// No property accesses, element accesses, or function calls
function f11(x) {
    x.foo; // Error
    x[5]; // Error
    x(); // Error
    new x(); // Error
}
function f20(x) {
    if (typeof x === "string" || typeof x === "number") {
        x; // string | number
    }
    if (x instanceof Error) {
        x; // Error
    }
    if (isFunction(x)) {
        x; // Function
    }
}
// Anything is assignable to unknown
function f21(pAny, pNever, pT) {
    var x;
    x = 123;
    x = "hello";
    x = [1, 2, 3];
    x = new Error();
    x = x;
    x = pAny;
    x = pNever;
    x = pT;
}
// unknown assignable only to itself and any
function f22(x) {
    var v1 = x;
    var v2 = x;
    var v3 = x; // Error
    var v4 = x; // Error
    var v5 = x; // Error
    var v6 = x; // Error
    var v7 = x; // Error
}
// Type parameter 'T extends unknown' not related to object
function f23(x) {
    var y = x; // Error
}
// Anything fresh but primitive assignable to { [x: string]: unknown }
function f24(x) {
    x = {};
    x = { a: 5 };
    x = [1, 2, 3]; // Error
    x = 123; // Error
}
// Locals of type unknown always considered initialized
function f25() {
    var x;
    var y = x;
}
// Spread of unknown causes result to be unknown
function f26(x, y, z) {
    var o1 = __assign({ a: 42 }, x); // { a: number }
    var o2 = __assign(__assign({ a: 42 }, x), y); // unknown
    var o3 = __assign(__assign(__assign({ a: 42 }, x), y), z); // any
    var o4 = __assign({ a: 42 }, z); // any
}
// Functions with unknown return type don't need return expressions
function f27() {
}
// Rest type cannot be created from unknown
function f28(x) {
    var a = __rest(x, []); // Error
}
// Class properties of type unknown don't need definite assignment
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
// Type parameter with explicit 'unknown' constraint not assignable to '{}'
function f30(t, u) {
    var x = t;
    var y = u;
}
function oops(arg) {
    return arg; // Error
}
