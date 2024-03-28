//// [tests/cases/conformance/types/literal/literalTypesAndDestructuring.ts] ////

//// [literalTypesAndDestructuring.ts]
declare let x: { a: 0 | 1 | undefined };

let { a: a1 } = x;
let { a: a2 = 0 } = x;
let { a: a3 = 2 } = x;
let { a: a4 = 2 as const } = x;

let b1 = x.a;
let b2 = x.a ?? 0;
let b3 = x.a ?? 2;
let b4 = x.a ?? 2 as const;

// Repro from #35693

interface Foo {
  bar: 'yo' | 'ha' | undefined;
}

let { bar = 'yo' } = {} as Foo;

bar;  // "yo" | "ha"


//// [literalTypesAndDestructuring.js]
"use strict";
var _a, _b, _c;
var a1 = x.a;
var _d = x.a, a2 = _d === void 0 ? 0 : _d;
var _e = x.a, a3 = _e === void 0 ? 2 : _e;
var _f = x.a, a4 = _f === void 0 ? 2 : _f;
var b1 = x.a;
var b2 = (_a = x.a) !== null && _a !== void 0 ? _a : 0;
var b3 = (_b = x.a) !== null && _b !== void 0 ? _b : 2;
var b4 = (_c = x.a) !== null && _c !== void 0 ? _c : 2;
var _g = {}.bar, bar = _g === void 0 ? 'yo' : _g;
bar; // "yo" | "ha"
