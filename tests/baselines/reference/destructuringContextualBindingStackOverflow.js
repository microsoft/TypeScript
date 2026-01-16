//// [tests/cases/compiler/destructuringContextualBindingStackOverflow.ts] ////

//// [destructuringContextualBindingStackOverflow.ts]
const { c, f }: string | number | symbol = { c: 0, f };
const { a, f: f1 }: string | number = { a: 0, f: (1 + f1) };
const { a: a1, f: f2 }: string | number = { a: f2, f: a1 };


//// [destructuringContextualBindingStackOverflow.js]
"use strict";
var _a = { c: 0, f: f }, c = _a.c, f = _a.f;
var _b = { a: 0, f: (1 + f1) }, a = _b.a, f1 = _b.f;
var _c = { a: f2, f: a1 }, a1 = _c.a, f2 = _c.f;
