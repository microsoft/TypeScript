//// [tests/cases/compiler/spliceTuples.ts] ////

//// [spliceTuples.ts]
declare const sb: [string, boolean];

let k1: [number, string, boolean];
k1 = [1, ...sb];

let k2: [number, string, boolean, number];
k2 = [1, ...sb, 1];

declare const sb_: [string, ...boolean[]];

let k3: [number, string, ...boolean[]];
k3 = [1, ...sb_];

declare const sbb_: [string, boolean, ...boolean[]];

let k4: [number, string, ...boolean[]];
k4 = [1, ...sbb_];

let k5: [number, string, boolean, ...boolean[]];
k5 = [1, ...sbb_];

let k6: [number, string, boolean, boolean, ...boolean[]];
k6 = [1, ...sbb_];


//// [spliceTuples.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var k1;
k1 = __spreadArray([1], sb, true);
var k2;
k2 = __spreadArray(__spreadArray([1], sb, true), [1], false);
var k3;
k3 = __spreadArray([1], sb_, true);
var k4;
k4 = __spreadArray([1], sbb_, true);
var k5;
k5 = __spreadArray([1], sbb_, true);
var k6;
k6 = __spreadArray([1], sbb_, true);
