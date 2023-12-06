//// [tests/cases/compiler/narrowingTypeofUndefined2.ts] ////

//// [narrowingTypeofUndefined2.ts]
declare function takeArray(arr: Array<unknown>): void;

function fn<T extends Array<unknown> | undefined>(arg: T) {
    if (typeof arg !== "undefined") {
        takeArray(arg);
        const n: Array<unknown> = arg;

        for (const p of arg) {  }
        const m = [...arg];
    }
}


//// [narrowingTypeofUndefined2.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function fn(arg) {
    if (typeof arg !== "undefined") {
        takeArray(arg);
        var n = arg;
        for (var _i = 0, arg_1 = arg; _i < arg_1.length; _i++) {
            var p = arg_1[_i];
        }
        var m = __spreadArray([], arg, true);
    }
}
