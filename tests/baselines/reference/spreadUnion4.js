//// [tests/cases/conformance/types/spread/spreadUnion4.ts] ////

//// [spreadUnion4.ts]
declare const a: { x: () => void }
declare const b: { x?: () => void }

const c = { ...a, ...b };


//// [spreadUnion4.js]
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
var c = __assign(__assign({}, a), b);
