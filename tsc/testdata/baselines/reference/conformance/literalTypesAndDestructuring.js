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
let { a: a1 } = x;
let { a: a2 = 0 } = x;
let { a: a3 = 2 } = x;
let { a: a4 = 2 } = x;
let b1 = x.a;
let b2 = (_a = x.a) !== null && _a !== void 0 ? _a : 0;
let b3 = (_b = x.a) !== null && _b !== void 0 ? _b : 2;
let b4 = (_c = x.a) !== null && _c !== void 0 ? _c : 2;
let { bar = 'yo' } = {};
bar; // "yo" | "ha"
