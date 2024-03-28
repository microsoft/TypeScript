//// [tests/cases/compiler/contextualTypeObjectSpreadExpression.ts] ////

//// [contextualTypeObjectSpreadExpression.ts]
interface I {
    a: "a";
}
let i: I;
i = { ...{ a: "a" } };


//// [contextualTypeObjectSpreadExpression.js]
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
var i;
i = __assign({ a: "a" });
