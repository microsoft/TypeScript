//// [tests/cases/compiler/destructuringContextualBindingStackOverflow.ts] ////

//// [destructuringContextualBindingStackOverflow.ts]
const { c, f }: string | number | symbol = { c: 0, f };


//// [destructuringContextualBindingStackOverflow.js]
"use strict";
var _a = { c: 0, f: f }, c = _a.c, f = _a.f;
