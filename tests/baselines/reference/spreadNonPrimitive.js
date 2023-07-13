//// [tests/cases/conformance/types/spread/spreadNonPrimitive.ts] ////

//// [spreadNonPrimitive.ts]
declare let o: object;
const x: { a: number, b: number } = { a: 1, ...o, b: 2 };


//// [spreadNonPrimitive.js]
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
var x = __assign(__assign({ a: 1 }, o), { b: 2 });
