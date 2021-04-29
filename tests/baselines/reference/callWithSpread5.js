//// [callWithSpread5.ts]
declare const n: number
declare const nnnu: [number, number, number?]
declare const nntnnnt: [number, number] | [number, number, number]
declare const ns: number[]
declare const nununu: [number?, number?, number?]
declare const nu: [number?]
declare function setHours(a: number, b?: number, c?: number, d?: number): number
declare function f(a: number, b: number, ...c: number[]): number
declare function g(a: number, b?: number, ...c: number[]): number

setHours(...nnnu, n)
setHours(...nntnnnt, n)

// TODO: Handle labels too

f(...nnnu, n) // maybe add special rules for trailing undefineds in spread tuples -> rests
f(...nntnnnt, n)

g(n, ...ns, n)
g(n, ...nununu, n)
g(n, ...nu, n)


//// [callWithSpread5.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
setHours.apply(void 0, __spreadArray(__spreadArray([], nnnu), [n]));
setHours.apply(void 0, __spreadArray(__spreadArray([], nntnnnt), [n]));
// TODO: Handle labels too
f.apply(void 0, __spreadArray(__spreadArray([], nnnu), [n])); // maybe add special rules for trailing undefineds in spread tuples -> rests
f.apply(void 0, __spreadArray(__spreadArray([], nntnnnt), [n]));
g.apply(void 0, __spreadArray(__spreadArray([n], ns), [n]));
g.apply(void 0, __spreadArray(__spreadArray([n], nununu), [n]));
g.apply(void 0, __spreadArray(__spreadArray([n], nu), [n]));
