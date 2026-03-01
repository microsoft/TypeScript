//// [tests/cases/conformance/expressions/contextualTyping/iterableContextualTyping1.ts] ////

//// [iterableContextualTyping1.ts]
var iter: Iterable<(x: string) => number> = [s => s.length];

//// [iterableContextualTyping1.js]
"use strict";
var iter = [s => s.length];
