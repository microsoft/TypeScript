//// [tests/cases/conformance/types/spread/spreadExcessProperty.ts] ////

//// [spreadExcessProperty.ts]
type A = { a: string, b: string };
const extra1 = { a: "a", b: "b", extra: "extra" };
const a1: A = { ...extra1 }; // spread should not give excess property errors


//// [spreadExcessProperty.js]
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
var extra1 = { a: "a", b: "b", extra: "extra" };
var a1 = __assign({}, extra1); // spread should not give excess property errors
