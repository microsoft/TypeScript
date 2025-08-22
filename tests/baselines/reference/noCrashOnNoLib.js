//// [tests/cases/compiler/noCrashOnNoLib.ts] ////

//// [noCrashOnNoLib.ts]
export function f() {
    let e: {}[];
    while (true) {
      e = [...(e || [])];
    }
}

//// [noCrashOnNoLib.js]
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = f;
function f() {
    var e;
    while (true) {
        e = __spreadArray([], (e || []), true);
    }
}
