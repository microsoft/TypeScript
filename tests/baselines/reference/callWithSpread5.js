//// [callWithSpread5.ts]
declare const x: number
declare const nnnu: [number, number, number?]
declare const nntnnnt: [number, number] | [number, number, number]
declare function fn(a: number, b: number, bb: number, ...c: number[]): number

fn(...nnnu, x)
fn(...nntnnnt, x)


//// [callWithSpread5.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
fn.apply(void 0, __spreadArray(__spreadArray([], nnnu), [x]));
fn.apply(void 0, __spreadArray(__spreadArray([], nntnnnt), [x]));
