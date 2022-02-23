//// [callWithSpread5.ts]
declare const x: number
declare const nnnu: [number, number, number?]
declare const nntnnnt: [number, number] | [number, number, number]
declare function fn(a: number, b: number, bb: number, ...c: number[]): number

fn(...nnnu, x)
fn(...nntnnnt, x)


//// [callWithSpread5.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
fn.apply(void 0, __spreadArray(__spreadArray([], nnnu, false), [x], false));
fn.apply(void 0, __spreadArray(__spreadArray([], nntnnnt, false), [x], false));
