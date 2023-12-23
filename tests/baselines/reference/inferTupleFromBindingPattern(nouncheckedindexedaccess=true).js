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

declare const f4: <T extends string[]>(t: T) => [T, number, string[]];
const [[f4e1], ...f4rest1] = f4(['1']);
f4e1.toLowerCase();

declare const f5: <T extends string[]>(t: T) => [[T, number, string[]]];
const [[[f5e1], ...f5rest1]] = f5(['1']);
f5e1.toLowerCase();

declare const f6: <T extends string[]>(t: T) => [...T, number];
const [f6e1] = f6(['1']);
f6e1.toLowerCase();

declare const f7: <T extends string[]>(t: T) => [number, ...T];
const [_, f7e1] = f7(['1']);
f7e1.toLowerCase();


//// [inferTupleFromBindingPattern.js]
"use strict";
var _a = f(function () { return [1, "hi", true]; }), e1 = _a[0], e2 = _a[1], e3 = _a[2];
var f2e1 = f2(['1'])[0][0];
f2e1.toLowerCase();
var f3e1 = f3(['1'])[0][0][0];
f3e1.toLowerCase();
var _b = f4(['1']), f4e1 = _b[0][0], f4rest1 = _b.slice(1);
f4e1.toLowerCase();
var _c = f5(['1'])[0], f5e1 = _c[0][0], f5rest1 = _c.slice(1);
f5e1.toLowerCase();
var f6e1 = f6(['1'])[0];
f6e1.toLowerCase();
var _d = f7(['1']), _ = _d[0], f7e1 = _d[1];
f7e1.toLowerCase();
