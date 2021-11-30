//// [variadicTuples1.ts]
// Variadics in tuple types

type TV0<T extends unknown[]> = [string, ...T];
type TV1<T extends unknown[]> = [string, ...T, number];
type TV2<T extends unknown[]> = [string, ...T, number, ...T];
type TV3<T extends unknown[]> = [string, ...T, ...number[], ...T];

// Normalization

type TN1 = TV1<[boolean, string]>;
type TN2 = TV1<[]>;
type TN3 = TV1<[boolean?]>;
type TN4 = TV1<string[]>;
type TN5 = TV1<[boolean] | [symbol, symbol]>;
type TN6 = TV1<any>;
type TN7 = TV1<never>;

// Variadics in array literals

function tup2<T extends unknown[], U extends unknown[]>(t: [...T], u: [...U]) {
    return [1, ...t, 2, ...u, 3] as const;
}

const t2 = tup2(['hello'], [10, true]);

function concat<T extends unknown[], U extends unknown[]>(t: [...T], u: [...U]): [...T, ...U] {
    return [...t, ...u];
}

declare const sa: string[];

const tc1 = concat([], []);
const tc2 = concat(['hello'], [42]);
const tc3 = concat([1, 2, 3], sa);
const tc4 = concat(sa, [1, 2, 3]);  // Ideally would be [...string[], number, number, number]

function concat2<T extends readonly unknown[], U extends readonly unknown[]>(t: T, u: U) {
    return [...t, ...u];  // (T[number] | U[number])[]
}

const tc5 = concat2([1, 2, 3] as const, [4, 5, 6] as const);  // (1 | 2 | 3 | 4 | 5 | 6)[]

// Spread arguments

declare function foo1(a: number, b: string, c: boolean, ...d: number[]): void;

function foo2(t1: [number, string], t2: [boolean], a1: number[]) {
    foo1(1, 'abc', true, 42, 43, 44);
    foo1(...t1, true, 42, 43, 44);
    foo1(...t1, ...t2, 42, 43, 44);
    foo1(...t1, ...t2, ...a1);
    foo1(...t1);  // Error
    foo1(...t1, 45);  // Error
}

declare function foo3<T extends unknown[]>(x: number, ...args: [...T, number]): T;

function foo4<U extends unknown[]>(u: U) {
    foo3(1, 2);
    foo3(1, 'hello', true, 2);
    foo3(1, ...u, 'hi', 2);
    foo3(1);
}

// Contextual typing of array literals

declare function ft1<T extends unknown[]>(t: T): T;
declare function ft2<T extends unknown[]>(t: T): readonly [...T];
declare function ft3<T extends unknown[]>(t: [...T]): T;
declare function ft4<T extends unknown[]>(t: [...T]): readonly [...T];

ft1(['hello', 42]);  // (string | number)[]
ft2(['hello', 42]);  // readonly (string | number)[]
ft3(['hello', 42]);  // [string, number]
ft4(['hello', 42]);  // readonly [string, number]

// Indexing variadic tuple types

function f0<T extends unknown[]>(t: [string, ...T], n: number) {
    const a = t[0];  // string
    const b = t[1];  // [string, ...T][1]
    const c = t[2];  // [string, ...T][2]
    const d = t[n];  // [string, ...T][number]
}

function f1<T extends unknown[]>(t: [string, ...T, number], n: number) {
    const a = t[0];  // string
    const b = t[1];  // [string, ...T, number][1]
    const c = t[2];  // [string, ...T, number][2]
    const d = t[n];  // [string, ...T, number][number]
}

// Destructuring variadic tuple types

function f2<T extends unknown[]>(t: [string, ...T]) {
    let [...ax] = t;  // [string, ...T]
    let [b1, ...bx] = t;  // string, [...T]
    let [c1, c2, ...cx] = t;  // string, [string, ...T][1], T[number][]
}

function f3<T extends unknown[]>(t: [string, ...T, number]) {
    let [...ax] = t;  // [string, ...T, number]
    let [b1, ...bx] = t;  // string, [...T, number]
    let [c1, c2, ...cx] = t;  // string, [string, ...T, number][1], (number | T[number])[]
}

// Mapped types applied to variadic tuple types

type Arrayify<T> = { [P in keyof T]: T[P][] };

type TM1<U extends unknown[]> = Arrayify<readonly [string, number?, ...U, ...boolean[]]>;  // [string[], (number | undefined)[]?, Arrayify<U>, ...boolean[][]]

type TP1<T extends unknown[]> = Partial<[string, ...T, number]>;  // [string?, Partial<T>, number?]
type TP2<T extends unknown[]> = Partial<[string, ...T, ...number[]]>;  // [string?, Partial<T>, ...(number | undefined)[]]

// Reverse mapping through mapped type applied to variadic tuple type

declare function fm1<T extends unknown[]>(t: Arrayify<[string, number, ...T]>): T;

let tm1 = fm1([['abc'], [42], [true], ['def']]);  // [boolean, string]

// Spread of readonly array-like infers mutable array-like

declare function fx1<T extends unknown[]>(a: string, ...args: T): T;

function gx1<U extends unknown[], V extends readonly unknown[]>(u: U, v: V) {
    fx1('abc');  // []
    fx1('abc', ...u);  // U
    fx1('abc', ...v);  // [...V]
    fx1<U>('abc', ...u);  // U
    fx1<V>('abc', ...v);  // Error
}

declare function fx2<T extends readonly unknown[]>(a: string, ...args: T): T;

function gx2<U extends unknown[], V extends readonly unknown[]>(u: U, v: V) {
    fx2('abc');  // []
    fx2('abc', ...u);  // U
    fx2('abc', ...v);  // [...V]
    fx2<U>('abc', ...u);  // U
    fx2<V>('abc', ...v);  // V
}

// Relations involving variadic tuple types

function f10<T extends string[], U extends T>(x: [string, ...unknown[]], y: [string, ...T], z: [string, ...U]) {
    x = y;
    x = z;
    y = x;  // Error
    y = z;
    z = x;  // Error
    z = y;  // Error
}

// For a generic type T, [...T] is assignable to T, T is assignable to readonly [...T], and T is assignable
// to [...T] when T is constrained to a mutable array or tuple type.

function f11<T extends unknown[]>(t: T, m: [...T], r: readonly [...T]) {
    t = m;
    t = r;  // Error
    m = t;
    m = r;  // Error
    r = t;
    r = m;
}

function f12<T extends readonly unknown[]>(t: T, m: [...T], r: readonly [...T]) {
    t = m;
    t = r;  // Error
    m = t;  // Error
    m = r;  // Error
    r = t;
    r = m;
}

function f13<T extends string[], U extends T>(t0: T, t1: [...T], t2: [...U]) {
    t0 = t1;
    t0 = t2;
    t1 = t0;
    t1 = t2;
    t2 = t0;  // Error
    t2 = t1;  // Error
}

function f14<T extends readonly string[], U extends T>(t0: T, t1: [...T], t2: [...U]) {
    t0 = t1;
    t0 = t2;
    t1 = t0;  // Error
    t1 = t2;
    t2 = t0;  // Error
    t2 = t1;  // Error
}

function f15<T extends string[], U extends T>(k0: keyof T, k1: keyof [...T], k2: keyof [...U], k3: keyof [1, 2, ...T]) {
    k0 = 'length';
    k1 = 'length';
    k2 = 'length';
    k0 = 'slice';
    k1 = 'slice';
    k2 = 'slice';
    k3 = '0';
    k3 = '1';
    k3 = '2';  // Error
}

// Inference between variadic tuple types

type First<T extends readonly unknown[]> =
    T extends readonly [unknown, ...unknown[]] ? T[0] :
    T[0] | undefined;

type DropFirst<T extends readonly unknown[]> = T extends readonly [unknown?, ...infer U] ? U : [...T];

type Last<T extends readonly unknown[]> =
    T extends readonly [...unknown[], infer U] ? U :
    T extends readonly [unknown, ...unknown[]] ? T[number] :
    T[number] | undefined;

type DropLast<T extends readonly unknown[]> = T extends readonly [...infer U, unknown] ? U : [...T];

type T00 = First<[number, symbol, string]>;
type T01 = First<[symbol, string]>;
type T02 = First<[string]>;
type T03 = First<[number, symbol, ...string[]]>;
type T04 = First<[symbol, ...string[]]>;
type T05 = First<[string?]>;
type T06 = First<string[]>;
type T07 = First<[]>;
type T08 = First<any>;
type T09 = First<never>;

type T10 = DropFirst<[number, symbol, string]>;
type T11 = DropFirst<[symbol, string]>;
type T12 = DropFirst<[string]>;
type T13 = DropFirst<[number, symbol, ...string[]]>;
type T14 = DropFirst<[symbol, ...string[]]>;
type T15 = DropFirst<[string?]>;
type T16 = DropFirst<string[]>;
type T17 = DropFirst<[]>;
type T18 = DropFirst<any>;
type T19 = DropFirst<never>;

type T20 = Last<[number, symbol, string]>;
type T21 = Last<[symbol, string]>;
type T22 = Last<[string]>;
type T23 = Last<[number, symbol, ...string[]]>;
type T24 = Last<[symbol, ...string[]]>;
type T25 = Last<[string?]>;
type T26 = Last<string[]>;
type T27 = Last<[]>;
type T28 = Last<any>;
type T29 = Last<never>;

type T30 = DropLast<[number, symbol, string]>;
type T31 = DropLast<[symbol, string]>;
type T32 = DropLast<[string]>;
type T33 = DropLast<[number, symbol, ...string[]]>;
type T34 = DropLast<[symbol, ...string[]]>;
type T35 = DropLast<[string?]>;
type T36 = DropLast<string[]>;
type T37 = DropLast<[]>;  // unknown[], maybe should be []
type T38 = DropLast<any>;
type T39 = DropLast<never>;

type R00 = First<readonly [number, symbol, string]>;
type R01 = First<readonly [symbol, string]>;
type R02 = First<readonly [string]>;
type R03 = First<readonly [number, symbol, ...string[]]>;
type R04 = First<readonly [symbol, ...string[]]>;
type R05 = First<readonly string[]>;
type R06 = First<readonly []>;

type R10 = DropFirst<readonly [number, symbol, string]>;
type R11 = DropFirst<readonly [symbol, string]>;
type R12 = DropFirst<readonly [string]>;
type R13 = DropFirst<readonly [number, symbol, ...string[]]>;
type R14 = DropFirst<readonly [symbol, ...string[]]>;
type R15 = DropFirst<readonly string[]>;
type R16 = DropFirst<readonly []>;

type R20 = Last<readonly [number, symbol, string]>;
type R21 = Last<readonly [symbol, string]>;
type R22 = Last<readonly [string]>;
type R23 = Last<readonly [number, symbol, ...string[]]>;
type R24 = Last<readonly [symbol, ...string[]]>;
type R25 = Last<readonly string[]>;
type R26 = Last<readonly []>;

type R30 = DropLast<readonly [number, symbol, string]>;
type R31 = DropLast<readonly [symbol, string]>;
type R32 = DropLast<readonly [string]>;
type R33 = DropLast<readonly [number, symbol, ...string[]]>;
type R34 = DropLast<readonly [symbol, ...string[]]>;
type R35 = DropLast<readonly string[]>;
type R36 = DropLast<readonly []>;

// Inference to [...T, ...U] with implied arity for T

function curry<T extends unknown[], U extends unknown[], R>(f: (...args: [...T, ...U]) => R, ...a: T) {
    return (...b: U) => f(...a, ...b);
}

const fn1 = (a: number, b: string, c: boolean, d: string[]) => 0;

const c0 = curry(fn1);  // (a: number, b: string, c: boolean, d: string[]) => number
const c1 = curry(fn1, 1);  // (b: string, c: boolean, d: string[]) => number
const c2 = curry(fn1, 1, 'abc');  // (c: boolean, d: string[]) => number
const c3 = curry(fn1, 1, 'abc', true);  // (d: string[]) => number
const c4 = curry(fn1, 1, 'abc', true, ['x', 'y']);  // () => number

const fn2 = (x: number, b: boolean, ...args: string[]) => 0;

const c10 = curry(fn2);  // (x: number, b: boolean, ...args: string[]) => number
const c11 = curry(fn2, 1);  // (b: boolean, ...args: string[]) => number
const c12 = curry(fn2, 1, true);  // (...args: string[]) => number
const c13 = curry(fn2, 1, true, 'abc', 'def');  // (...args: string[]) => number

const fn3 = (...args: string[]) => 0;

const c20 = curry(fn3);  // (...args: string[]) => number
const c21 = curry(fn3, 'abc', 'def');  // (...args: string[]) => number
const c22 = curry(fn3, ...sa);  // (...args: string[]) => number

// No inference to [...T, ...U] when there is no implied arity

function curry2<T extends unknown[], U extends unknown[], R>(f: (...args: [...T, ...U]) => R, t: [...T], u: [...U]) {
    return f(...t, ...u);
}

declare function fn10(a: string, b: number, c: boolean): string[];

curry2(fn10, ['hello', 42], [true]);
curry2(fn10, ['hello'], [42, true]);

// Inference to [...T] has higher priority than inference to [...T, number?]

declare function ft<T extends unknown[]>(t1: [...T], t2: [...T, number?]): T;

ft([1, 2, 3], [1, 2, 3]);
ft([1, 2], [1, 2, 3]);
ft(['a', 'b'], ['c', 'd'])
ft(['a', 'b'], ['c', 'd', 42])

// Last argument is contextually typed

declare function call<T extends unknown[], R>(...args: [...T, (...args: T) => R]): [T, R];

call('hello', 32, (a, b) => 42);
call(...sa, (...x) => 42);

// No inference to ending optional elements (except with identical structure)

declare function f20<T extends unknown[] = []>(args: [...T, number?]): T;

function f21<U extends string[]>(args: [...U, number?]) {
    let v1 = f20(args);  // U
    let v2 = f20(["foo", "bar"]);  // [string]
    let v3 = f20(["foo", 42]);  // [string]
}

declare function f22<T extends unknown[] = []>(args: [...T, number]): T;
declare function f22<T extends unknown[] = []>(args: [...T]): T;

function f23<U extends string[]>(args: [...U, number]) {
    let v1 = f22(args);  // U
    let v2 = f22(["foo", "bar"]);  // [string, string]
    let v3 = f22(["foo", 42]);  // [string]
}

// Repro from #39327

interface Desc<A extends unknown[], T> {
    readonly f: (...args: A) => T;
    bind<T extends unknown[], U extends unknown[], R>(this: Desc<[...T, ...U], R>, ...args: T): Desc<[...U], R>;
}

declare const a: Desc<[string, number, boolean], object>;
const b = a.bind("", 1);  // Desc<[boolean], object>

// Repro from #39607

declare function getUser(id: string, options?: { x?: string }): string;

declare function getOrgUser(id: string, orgId: number, options?: { y?: number, z?: boolean }): void;

function callApi<T extends unknown[] = [], U = void>(method: (...args: [...T, object]) => U) {
    return (...args: [...T]) => method(...args, {});
}

callApi(getUser);
callApi(getOrgUser);

// Repro from #40235

type Numbers = number[];
type Unbounded = [...Numbers, boolean];
const data: Unbounded = [false, false];  // Error

type U1 = [string, ...Numbers, boolean];
type U2 = [...[string, ...Numbers], boolean];
type U3 = [...[string, number], boolean];


//// [variadicTuples1.js]
"use strict";
// Variadics in tuple types
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Variadics in array literals
function tup2(t, u) {
    return __spreadArray(__spreadArray(__spreadArray(__spreadArray([1], t, true), [2], false), u, true), [3], false);
}
var t2 = tup2(['hello'], [10, true]);
function concat(t, u) {
    return __spreadArray(__spreadArray([], t, true), u, true);
}
var tc1 = concat([], []);
var tc2 = concat(['hello'], [42]);
var tc3 = concat([1, 2, 3], sa);
var tc4 = concat(sa, [1, 2, 3]); // Ideally would be [...string[], number, number, number]
function concat2(t, u) {
    return __spreadArray(__spreadArray([], t, true), u, true); // (T[number] | U[number])[]
}
var tc5 = concat2([1, 2, 3], [4, 5, 6]); // (1 | 2 | 3 | 4 | 5 | 6)[]
function foo2(t1, t2, a1) {
    foo1(1, 'abc', true, 42, 43, 44);
    foo1.apply(void 0, __spreadArray(__spreadArray([], t1, false), [true, 42, 43, 44], false));
    foo1.apply(void 0, __spreadArray(__spreadArray(__spreadArray([], t1, false), t2, false), [42, 43, 44], false));
    foo1.apply(void 0, __spreadArray(__spreadArray(__spreadArray([], t1, false), t2, false), a1, false));
    foo1.apply(void 0, t1); // Error
    foo1.apply(void 0, __spreadArray(__spreadArray([], t1, false), [45], false)); // Error
}
function foo4(u) {
    foo3(1, 2);
    foo3(1, 'hello', true, 2);
    foo3.apply(void 0, __spreadArray(__spreadArray([1], u, false), ['hi', 2], false));
    foo3(1);
}
ft1(['hello', 42]); // (string | number)[]
ft2(['hello', 42]); // readonly (string | number)[]
ft3(['hello', 42]); // [string, number]
ft4(['hello', 42]); // readonly [string, number]
// Indexing variadic tuple types
function f0(t, n) {
    var a = t[0]; // string
    var b = t[1]; // [string, ...T][1]
    var c = t[2]; // [string, ...T][2]
    var d = t[n]; // [string, ...T][number]
}
function f1(t, n) {
    var a = t[0]; // string
    var b = t[1]; // [string, ...T, number][1]
    var c = t[2]; // [string, ...T, number][2]
    var d = t[n]; // [string, ...T, number][number]
}
// Destructuring variadic tuple types
function f2(t) {
    var ax = t.slice(0); // [string, ...T]
    var b1 = t[0], bx = t.slice(1); // string, [...T]
    var c1 = t[0], c2 = t[1], cx = t.slice(2); // string, [string, ...T][1], T[number][]
}
function f3(t) {
    var ax = t.slice(0); // [string, ...T, number]
    var b1 = t[0], bx = t.slice(1); // string, [...T, number]
    var c1 = t[0], c2 = t[1], cx = t.slice(2); // string, [string, ...T, number][1], (number | T[number])[]
}
var tm1 = fm1([['abc'], [42], [true], ['def']]); // [boolean, string]
function gx1(u, v) {
    fx1('abc'); // []
    fx1.apply(void 0, __spreadArray(['abc'], u, false)); // U
    fx1.apply(void 0, __spreadArray(['abc'], v, false)); // [...V]
    fx1.apply(void 0, __spreadArray(['abc'], u, false)); // U
    fx1.apply(void 0, __spreadArray(['abc'], v, false)); // Error
}
function gx2(u, v) {
    fx2('abc'); // []
    fx2.apply(void 0, __spreadArray(['abc'], u, false)); // U
    fx2.apply(void 0, __spreadArray(['abc'], v, false)); // [...V]
    fx2.apply(void 0, __spreadArray(['abc'], u, false)); // U
    fx2.apply(void 0, __spreadArray(['abc'], v, false)); // V
}
// Relations involving variadic tuple types
function f10(x, y, z) {
    x = y;
    x = z;
    y = x; // Error
    y = z;
    z = x; // Error
    z = y; // Error
}
// For a generic type T, [...T] is assignable to T, T is assignable to readonly [...T], and T is assignable
// to [...T] when T is constrained to a mutable array or tuple type.
function f11(t, m, r) {
    t = m;
    t = r; // Error
    m = t;
    m = r; // Error
    r = t;
    r = m;
}
function f12(t, m, r) {
    t = m;
    t = r; // Error
    m = t; // Error
    m = r; // Error
    r = t;
    r = m;
}
function f13(t0, t1, t2) {
    t0 = t1;
    t0 = t2;
    t1 = t0;
    t1 = t2;
    t2 = t0; // Error
    t2 = t1; // Error
}
function f14(t0, t1, t2) {
    t0 = t1;
    t0 = t2;
    t1 = t0; // Error
    t1 = t2;
    t2 = t0; // Error
    t2 = t1; // Error
}
function f15(k0, k1, k2, k3) {
    k0 = 'length';
    k1 = 'length';
    k2 = 'length';
    k0 = 'slice';
    k1 = 'slice';
    k2 = 'slice';
    k3 = '0';
    k3 = '1';
    k3 = '2'; // Error
}
// Inference to [...T, ...U] with implied arity for T
function curry(f) {
    var a = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        a[_i - 1] = arguments[_i];
    }
    return function () {
        var b = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            b[_i] = arguments[_i];
        }
        return f.apply(void 0, __spreadArray(__spreadArray([], a, false), b, false));
    };
}
var fn1 = function (a, b, c, d) { return 0; };
var c0 = curry(fn1); // (a: number, b: string, c: boolean, d: string[]) => number
var c1 = curry(fn1, 1); // (b: string, c: boolean, d: string[]) => number
var c2 = curry(fn1, 1, 'abc'); // (c: boolean, d: string[]) => number
var c3 = curry(fn1, 1, 'abc', true); // (d: string[]) => number
var c4 = curry(fn1, 1, 'abc', true, ['x', 'y']); // () => number
var fn2 = function (x, b) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return 0;
};
var c10 = curry(fn2); // (x: number, b: boolean, ...args: string[]) => number
var c11 = curry(fn2, 1); // (b: boolean, ...args: string[]) => number
var c12 = curry(fn2, 1, true); // (...args: string[]) => number
var c13 = curry(fn2, 1, true, 'abc', 'def'); // (...args: string[]) => number
var fn3 = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return 0;
};
var c20 = curry(fn3); // (...args: string[]) => number
var c21 = curry(fn3, 'abc', 'def'); // (...args: string[]) => number
var c22 = curry.apply(void 0, __spreadArray([fn3], sa, false)); // (...args: string[]) => number
// No inference to [...T, ...U] when there is no implied arity
function curry2(f, t, u) {
    return f.apply(void 0, __spreadArray(__spreadArray([], t, false), u, false));
}
curry2(fn10, ['hello', 42], [true]);
curry2(fn10, ['hello'], [42, true]);
ft([1, 2, 3], [1, 2, 3]);
ft([1, 2], [1, 2, 3]);
ft(['a', 'b'], ['c', 'd']);
ft(['a', 'b'], ['c', 'd', 42]);
call('hello', 32, function (a, b) { return 42; });
call.apply(void 0, __spreadArray(__spreadArray([], sa, false), [function () {
        var x = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            x[_i] = arguments[_i];
        }
        return 42;
    }], false));
function f21(args) {
    var v1 = f20(args); // U
    var v2 = f20(["foo", "bar"]); // [string]
    var v3 = f20(["foo", 42]); // [string]
}
function f23(args) {
    var v1 = f22(args); // U
    var v2 = f22(["foo", "bar"]); // [string, string]
    var v3 = f22(["foo", 42]); // [string]
}
var b = a.bind("", 1); // Desc<[boolean], object>
function callApi(method) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return method.apply(void 0, __spreadArray(__spreadArray([], args, false), [{}], false));
    };
}
callApi(getUser);
callApi(getOrgUser);
var data = [false, false]; // Error


//// [variadicTuples1.d.ts]
declare type TV0<T extends unknown[]> = [string, ...T];
declare type TV1<T extends unknown[]> = [string, ...T, number];
declare type TV2<T extends unknown[]> = [string, ...T, number, ...T];
declare type TV3<T extends unknown[]> = [string, ...T, ...number[], ...T];
declare type TN1 = TV1<[boolean, string]>;
declare type TN2 = TV1<[]>;
declare type TN3 = TV1<[boolean?]>;
declare type TN4 = TV1<string[]>;
declare type TN5 = TV1<[boolean] | [symbol, symbol]>;
declare type TN6 = TV1<any>;
declare type TN7 = TV1<never>;
declare function tup2<T extends unknown[], U extends unknown[]>(t: [...T], u: [...U]): readonly [1, ...T, 2, ...U, 3];
declare const t2: readonly [1, string, 2, number, boolean, 3];
declare function concat<T extends unknown[], U extends unknown[]>(t: [...T], u: [...U]): [...T, ...U];
declare const sa: string[];
declare const tc1: [];
declare const tc2: [string, number];
declare const tc3: [number, number, number, ...string[]];
declare const tc4: [...string[], number, number, number];
declare function concat2<T extends readonly unknown[], U extends readonly unknown[]>(t: T, u: U): (T[number] | U[number])[];
declare const tc5: (2 | 4 | 1 | 3 | 6 | 5)[];
declare function foo1(a: number, b: string, c: boolean, ...d: number[]): void;
declare function foo2(t1: [number, string], t2: [boolean], a1: number[]): void;
declare function foo3<T extends unknown[]>(x: number, ...args: [...T, number]): T;
declare function foo4<U extends unknown[]>(u: U): void;
declare function ft1<T extends unknown[]>(t: T): T;
declare function ft2<T extends unknown[]>(t: T): readonly [...T];
declare function ft3<T extends unknown[]>(t: [...T]): T;
declare function ft4<T extends unknown[]>(t: [...T]): readonly [...T];
declare function f0<T extends unknown[]>(t: [string, ...T], n: number): void;
declare function f1<T extends unknown[]>(t: [string, ...T, number], n: number): void;
declare function f2<T extends unknown[]>(t: [string, ...T]): void;
declare function f3<T extends unknown[]>(t: [string, ...T, number]): void;
declare type Arrayify<T> = {
    [P in keyof T]: T[P][];
};
declare type TM1<U extends unknown[]> = Arrayify<readonly [string, number?, ...U, ...boolean[]]>;
declare type TP1<T extends unknown[]> = Partial<[string, ...T, number]>;
declare type TP2<T extends unknown[]> = Partial<[string, ...T, ...number[]]>;
declare function fm1<T extends unknown[]>(t: Arrayify<[string, number, ...T]>): T;
declare let tm1: [boolean, string];
declare function fx1<T extends unknown[]>(a: string, ...args: T): T;
declare function gx1<U extends unknown[], V extends readonly unknown[]>(u: U, v: V): void;
declare function fx2<T extends readonly unknown[]>(a: string, ...args: T): T;
declare function gx2<U extends unknown[], V extends readonly unknown[]>(u: U, v: V): void;
declare function f10<T extends string[], U extends T>(x: [string, ...unknown[]], y: [string, ...T], z: [string, ...U]): void;
declare function f11<T extends unknown[]>(t: T, m: [...T], r: readonly [...T]): void;
declare function f12<T extends readonly unknown[]>(t: T, m: [...T], r: readonly [...T]): void;
declare function f13<T extends string[], U extends T>(t0: T, t1: [...T], t2: [...U]): void;
declare function f14<T extends readonly string[], U extends T>(t0: T, t1: [...T], t2: [...U]): void;
declare function f15<T extends string[], U extends T>(k0: keyof T, k1: keyof [...T], k2: keyof [...U], k3: keyof [1, 2, ...T]): void;
declare type First<T extends readonly unknown[]> = T extends readonly [unknown, ...unknown[]] ? T[0] : T[0] | undefined;
declare type DropFirst<T extends readonly unknown[]> = T extends readonly [unknown?, ...infer U] ? U : [...T];
declare type Last<T extends readonly unknown[]> = T extends readonly [...unknown[], infer U] ? U : T extends readonly [unknown, ...unknown[]] ? T[number] : T[number] | undefined;
declare type DropLast<T extends readonly unknown[]> = T extends readonly [...infer U, unknown] ? U : [...T];
declare type T00 = First<[number, symbol, string]>;
declare type T01 = First<[symbol, string]>;
declare type T02 = First<[string]>;
declare type T03 = First<[number, symbol, ...string[]]>;
declare type T04 = First<[symbol, ...string[]]>;
declare type T05 = First<[string?]>;
declare type T06 = First<string[]>;
declare type T07 = First<[]>;
declare type T08 = First<any>;
declare type T09 = First<never>;
declare type T10 = DropFirst<[number, symbol, string]>;
declare type T11 = DropFirst<[symbol, string]>;
declare type T12 = DropFirst<[string]>;
declare type T13 = DropFirst<[number, symbol, ...string[]]>;
declare type T14 = DropFirst<[symbol, ...string[]]>;
declare type T15 = DropFirst<[string?]>;
declare type T16 = DropFirst<string[]>;
declare type T17 = DropFirst<[]>;
declare type T18 = DropFirst<any>;
declare type T19 = DropFirst<never>;
declare type T20 = Last<[number, symbol, string]>;
declare type T21 = Last<[symbol, string]>;
declare type T22 = Last<[string]>;
declare type T23 = Last<[number, symbol, ...string[]]>;
declare type T24 = Last<[symbol, ...string[]]>;
declare type T25 = Last<[string?]>;
declare type T26 = Last<string[]>;
declare type T27 = Last<[]>;
declare type T28 = Last<any>;
declare type T29 = Last<never>;
declare type T30 = DropLast<[number, symbol, string]>;
declare type T31 = DropLast<[symbol, string]>;
declare type T32 = DropLast<[string]>;
declare type T33 = DropLast<[number, symbol, ...string[]]>;
declare type T34 = DropLast<[symbol, ...string[]]>;
declare type T35 = DropLast<[string?]>;
declare type T36 = DropLast<string[]>;
declare type T37 = DropLast<[]>;
declare type T38 = DropLast<any>;
declare type T39 = DropLast<never>;
declare type R00 = First<readonly [number, symbol, string]>;
declare type R01 = First<readonly [symbol, string]>;
declare type R02 = First<readonly [string]>;
declare type R03 = First<readonly [number, symbol, ...string[]]>;
declare type R04 = First<readonly [symbol, ...string[]]>;
declare type R05 = First<readonly string[]>;
declare type R06 = First<readonly []>;
declare type R10 = DropFirst<readonly [number, symbol, string]>;
declare type R11 = DropFirst<readonly [symbol, string]>;
declare type R12 = DropFirst<readonly [string]>;
declare type R13 = DropFirst<readonly [number, symbol, ...string[]]>;
declare type R14 = DropFirst<readonly [symbol, ...string[]]>;
declare type R15 = DropFirst<readonly string[]>;
declare type R16 = DropFirst<readonly []>;
declare type R20 = Last<readonly [number, symbol, string]>;
declare type R21 = Last<readonly [symbol, string]>;
declare type R22 = Last<readonly [string]>;
declare type R23 = Last<readonly [number, symbol, ...string[]]>;
declare type R24 = Last<readonly [symbol, ...string[]]>;
declare type R25 = Last<readonly string[]>;
declare type R26 = Last<readonly []>;
declare type R30 = DropLast<readonly [number, symbol, string]>;
declare type R31 = DropLast<readonly [symbol, string]>;
declare type R32 = DropLast<readonly [string]>;
declare type R33 = DropLast<readonly [number, symbol, ...string[]]>;
declare type R34 = DropLast<readonly [symbol, ...string[]]>;
declare type R35 = DropLast<readonly string[]>;
declare type R36 = DropLast<readonly []>;
declare function curry<T extends unknown[], U extends unknown[], R>(f: (...args: [...T, ...U]) => R, ...a: T): (...b: U) => R;
declare const fn1: (a: number, b: string, c: boolean, d: string[]) => number;
declare const c0: (a: number, b: string, c: boolean, d: string[]) => number;
declare const c1: (b: string, c: boolean, d: string[]) => number;
declare const c2: (c: boolean, d: string[]) => number;
declare const c3: (d: string[]) => number;
declare const c4: () => number;
declare const fn2: (x: number, b: boolean, ...args: string[]) => number;
declare const c10: (x: number, b: boolean, ...args: string[]) => number;
declare const c11: (b: boolean, ...args: string[]) => number;
declare const c12: (...b: string[]) => number;
declare const c13: (...b: string[]) => number;
declare const fn3: (...args: string[]) => number;
declare const c20: (...b: string[]) => number;
declare const c21: (...b: string[]) => number;
declare const c22: (...b: string[]) => number;
declare function curry2<T extends unknown[], U extends unknown[], R>(f: (...args: [...T, ...U]) => R, t: [...T], u: [...U]): R;
declare function fn10(a: string, b: number, c: boolean): string[];
declare function ft<T extends unknown[]>(t1: [...T], t2: [...T, number?]): T;
declare function call<T extends unknown[], R>(...args: [...T, (...args: T) => R]): [T, R];
declare function f20<T extends unknown[] = []>(args: [...T, number?]): T;
declare function f21<U extends string[]>(args: [...U, number?]): void;
declare function f22<T extends unknown[] = []>(args: [...T, number]): T;
declare function f22<T extends unknown[] = []>(args: [...T]): T;
declare function f23<U extends string[]>(args: [...U, number]): void;
interface Desc<A extends unknown[], T> {
    readonly f: (...args: A) => T;
    bind<T extends unknown[], U extends unknown[], R>(this: Desc<[...T, ...U], R>, ...args: T): Desc<[...U], R>;
}
declare const a: Desc<[string, number, boolean], object>;
declare const b: Desc<[boolean], object>;
declare function getUser(id: string, options?: {
    x?: string;
}): string;
declare function getOrgUser(id: string, orgId: number, options?: {
    y?: number;
    z?: boolean;
}): void;
declare function callApi<T extends unknown[] = [], U = void>(method: (...args: [...T, object]) => U): (...args_0: T) => U;
declare type Numbers = number[];
declare type Unbounded = [...Numbers, boolean];
declare const data: Unbounded;
declare type U1 = [string, ...Numbers, boolean];
declare type U2 = [...[string, ...Numbers], boolean];
declare type U3 = [...[string, number], boolean];
