//// [tests/cases/compiler/destructuringFromUnionSpread.ts] ////

//// [destructuringFromUnionSpread.ts]
interface A { a: string }
interface B { b: number }

declare const x: A | B;
const { a } = { ...x } // error


//// [destructuringFromUnionSpread.js]
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
var a = __assign({}, x).a; // error
