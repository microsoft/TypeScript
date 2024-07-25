//// [tests/cases/compiler/spreadObjectWithIndexDoesNotAddUndefinedToLocalIndex.ts] ////

//// [spreadObjectWithIndexDoesNotAddUndefinedToLocalIndex.ts]
declare const m: { [k: string]: string };
const x: { [k: string]: string } = { ...m, ["a" + "b"]: "" };

//// [spreadObjectWithIndexDoesNotAddUndefinedToLocalIndex.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
var x = __assign(__assign({}, m), (_a = {}, _a["a" + "b"] = "", _a));
