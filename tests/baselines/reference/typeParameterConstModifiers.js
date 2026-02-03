//// [tests/cases/conformance/types/typeParameters/typeParameterLists/typeParameterConstModifiers.ts] ////

//// [typeParameterConstModifiers.ts]
declare function f1<const T>(x: T): T;

const x11 = f1('a');
const x12 = f1(['a', ['b', 'c']]);
const x13 = f1({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });

declare function f2<const T, U>(x: T | undefined): T;

const x21 = f2('a');
const x22 = f2(['a', ['b', 'c']]);
const x23 = f2({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });

declare function f3<const T>(x: T): T[];

const x31 = f3("hello");
const x32 = f3("hello");

declare function f4<const T>(obj: [T, T]): T;

const x41 = f4([[1, 'x'], [2, 'y']]);
const x42 = f4([{ a: 1, b: 'x' }, { a: 2, b: 'y' }]);

declare function f5<const T>(obj: { x: T, y: T }): T;

const x51 = f5({ x: [1, 'x'], y: [2, 'y'] });
const x52 = f5({ x: { a: 1, b: 'x' }, y: { a: 2, b: 'y' } });

declare function f6<const T extends readonly unknown[]>(...args: T): T;

const x61 = f6(1, 'b', { a: 1, b: 'x' });
const x62 = f6(...[1, 'b']);
const x63 = f6(true, ...[1, 'b']);
const x64 = f6(...([1, 'b']));
const x65 = f6(true, ...([1, 'b']));

class C1<const T> {
    constructor(x: T) {}
    foo<const U>(x: U) { return x; }
}

const c71 = new C1({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });
const c72 = c71.foo(['a', ['b', 'c']]);

const C2 = class <const T> {}

const fx1 = <const T>(x: T) => x;
const fx2 = <const T,>(x: T) => x;

interface I1<const T> { x: T }  // Error

interface I2 {
    f<const T>(x: T): T;
}

type T1<const T> = T;  // Error

type T2 = <const T>(x: T) => T;
type T3 = { <const T>(x: T): T };
type T4 = new <const T>(x: T) => T;
type T5 = { new <const T>(x: T): T };

// Corrected repro from #51745

type Obj = { a: { b: { c: "123" } } };

type GetPath<T, P> =
    P extends readonly [] ? T :
    P extends readonly [infer A extends keyof T, ...infer Rest] ? GetPath<T[A], Rest> :
    never;

function set<T, const P extends readonly string[]>(obj: T, path: P, value: GetPath<T, P>) {}

declare let obj: Obj;
declare let value: "123";

set(obj, ['a', 'b', 'c'], value);

// Repro from #52007

declare function inners<const T extends readonly any[]>(...args: readonly [unknown, ...T, unknown]): T;

const test = inners(1,2,3,4,5);

declare function inners2<const T extends readonly any[]>(args: readonly [unknown, ...T, unknown]): T;

const test2 = inners2([1,2,3,4,5]);

// Repro from #53307

type NotEmpty<T extends Record<string, any>> = keyof T extends never ? never : T;

const thing = <const O extends Record<string, any>>(o: NotEmpty<O>) => o;

const t = thing({ foo: '' });  // readonly { foo: "" }

type NotEmptyMapped<T extends Record<string, any>> = keyof T extends never ? never : { [K in keyof T]: T[K] };

const thingMapped = <const O extends Record<string, any>>(o: NotEmptyMapped<O>) => o;

const tMapped = thingMapped({ foo: '' });  // { foo: "" }

// repro from https://github.com/microsoft/TypeScript/issues/55033

function factory_55033_minimal<const T extends readonly unknown[]>(cb: (...args: T) => void) {
    return {} as T
}

const test_55033_minimal = factory_55033_minimal((b: string) => {})

function factory_55033<const T extends readonly unknown[]>(cb: (...args: T) => void) {
    return function call<const K extends T>(...args: K): K {
        return {} as K;
    };
}

const t1_55033 = factory_55033((a: { test: number }, b: string) => {})(
    { test: 123 },
    "some string"
);

const t2_55033 = factory_55033((a: { test: number }, b: string) => {})(
    { test: 123 } as const,
    "some string"
);

// Same with non-readonly constraint

function factory_55033_2<const T extends unknown[]>(cb: (...args: T) => void) {
    return function call<const K extends T>(...args: K): K {
        return {} as K;
    };
}

const t1_55033_2 = factory_55033_2((a: { test: number }, b: string) => {})(
    { test: 123 },
    "some string"
);

const t2_55033_2 = factory_55033_2((a: { test: number }, b: string) => {})(
    { test: 123 } as const,
    "some string"
);

// Repro from https://github.com/microsoft/TypeScript/issues/51931

declare function fn<const T extends any[]>(...args: T): T;

const a = fn("a", false);

// More examples of non-readonly constraints

declare function fa1<const T extends unknown[]>(args: T): T;
declare function fa2<const T extends readonly unknown[]>(args: T): T;

fa1(["hello", 42]);
fa2(["hello", 42]);

declare function fb1<const T extends unknown[]>(...args: T): T;
declare function fb2<const T extends readonly unknown[]>(...args: T): T;

fb1("hello", 42);
fb2("hello", 42);

declare function fc1<const T extends unknown[]>(f: (...args: T) => void, ...args: T): T;
declare function fc2<const T extends readonly unknown[]>(f: (...args: T) => void, ...args: T): T;

fc1((a: string, b: number) => {}, "hello", 42);
fc2((a: string, b: number) => {}, "hello", 42);

declare function fd1<const T extends string[] | number[]>(args: T): T;
declare function fd2<const T extends string[] | readonly number[]>(args: T): T;
declare function fd3<const T extends readonly string[] | readonly number[]>(args: T): T;

fd1(["hello", "world"]);
fd1([1, 2, 3]);
fd2(["hello", "world"]);
fd2([1, 2, 3]);
fd3(["hello", "world"]);
fd3([1, 2, 3]);

declare function fn1<const T extends { foo: unknown[] }[]>(...args: T): T;

fn1({ foo: ["hello", 123] }, { foo: [true]});


//// [typeParameterConstModifiers.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var x11 = f1('a');
var x12 = f1(['a', ['b', 'c']]);
var x13 = f1({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });
var x21 = f2('a');
var x22 = f2(['a', ['b', 'c']]);
var x23 = f2({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });
var x31 = f3("hello");
var x32 = f3("hello");
var x41 = f4([[1, 'x'], [2, 'y']]);
var x42 = f4([{ a: 1, b: 'x' }, { a: 2, b: 'y' }]);
var x51 = f5({ x: [1, 'x'], y: [2, 'y'] });
var x52 = f5({ x: { a: 1, b: 'x' }, y: { a: 2, b: 'y' } });
var x61 = f6(1, 'b', { a: 1, b: 'x' });
var x62 = f6.apply(void 0, [1, 'b']);
var x63 = f6.apply(void 0, __spreadArray([true], [1, 'b'], false));
var x64 = f6.apply(void 0, ([1, 'b']));
var x65 = f6.apply(void 0, __spreadArray([true], ([1, 'b']), false));
var C1 = /** @class */ (function () {
    function C1(x) {
    }
    C1.prototype.foo = function (x) { return x; };
    return C1;
}());
var c71 = new C1({ a: 1, b: "c", d: ["e", 2, true, { f: "g" }] });
var c72 = c71.foo(['a', ['b', 'c']]);
var C2 = /** @class */ (function () {
    function class_1() {
    }
    return class_1;
}());
var fx1 = function (x) { return x; };
var fx2 = function (x) { return x; };
function set(obj, path, value) { }
set(obj, ['a', 'b', 'c'], value);
var test = inners(1, 2, 3, 4, 5);
var test2 = inners2([1, 2, 3, 4, 5]);
var thing = function (o) { return o; };
var t = thing({ foo: '' }); // readonly { foo: "" }
var thingMapped = function (o) { return o; };
var tMapped = thingMapped({ foo: '' }); // { foo: "" }
// repro from https://github.com/microsoft/TypeScript/issues/55033
function factory_55033_minimal(cb) {
    return {};
}
var test_55033_minimal = factory_55033_minimal(function (b) { });
function factory_55033(cb) {
    return function call() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return {};
    };
}
var t1_55033 = factory_55033(function (a, b) { })({ test: 123 }, "some string");
var t2_55033 = factory_55033(function (a, b) { })({ test: 123 }, "some string");
// Same with non-readonly constraint
function factory_55033_2(cb) {
    return function call() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return {};
    };
}
var t1_55033_2 = factory_55033_2(function (a, b) { })({ test: 123 }, "some string");
var t2_55033_2 = factory_55033_2(function (a, b) { })({ test: 123 }, "some string");
var a = fn("a", false);
fa1(["hello", 42]);
fa2(["hello", 42]);
fb1("hello", 42);
fb2("hello", 42);
fc1(function (a, b) { }, "hello", 42);
fc2(function (a, b) { }, "hello", 42);
fd1(["hello", "world"]);
fd1([1, 2, 3]);
fd2(["hello", "world"]);
fd2([1, 2, 3]);
fd3(["hello", "world"]);
fd3([1, 2, 3]);
fn1({ foo: ["hello", 123] }, { foo: [true] });
