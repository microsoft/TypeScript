//// [tests/cases/compiler/inferTupleFromBindingPattern.ts] ////

//// [inferTupleFromBindingPattern.ts]
declare function f<T>(cb: () => T): T;
const [e1, e2, e3] = f(() => [1, "hi", true]);

// repro from #42969
declare const f2: <T extends string[]>(t: T) => [T, string[]];
const [[f2e1]] = f2(['1']);
f2e1.toLowerCase();

declare const f3: <T extends string[]>(t: T) => [[T, string[]]];
const [[[f3e1]]] = f3(['1']);
f3e1.toLowerCase();

//// [inferTupleFromBindingPattern.js]
"use strict";
var _a = f(function () { return [1, "hi", true]; }), e1 = _a[0], e2 = _a[1], e3 = _a[2];
var f2e1 = f2(['1'])[0][0];
f2e1.toLowerCase();
var f3e1 = f3(['1'])[0][0][0];
f3e1.toLowerCase();
