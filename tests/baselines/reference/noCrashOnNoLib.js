//// [noCrashOnNoLib.ts]
export function f() {
    let e: {}[];
    while (true) {
      e = [...(e || [])];
    }
}

//// [noCrashOnNoLib.js]
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.f = void 0;
function f() {
    var e;
    while (true) {
        e = __spreadArray([], (e || []));
    }
}
exports.f = f;
