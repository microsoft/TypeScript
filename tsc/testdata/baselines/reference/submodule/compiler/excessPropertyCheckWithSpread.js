//// [tests/cases/compiler/excessPropertyCheckWithSpread.ts] ////

//// [excessPropertyCheckWithSpread.ts]
declare function f({ a: number }): void
interface I {
    readonly n: number;
}
declare let i: I;
f({ a: 1, ...i });

interface R {
    opt?: number
}
interface L {
    opt: string
}
declare let l: L;
declare let r: R;
f({ a: 1, ...l, ...r });


//// [excessPropertyCheckWithSpread.js]
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
f(__assign({ a: 1 }, i));
f(__assign(__assign({ a: 1 }, l), r));
