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
