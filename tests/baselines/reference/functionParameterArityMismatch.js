//// [tests/cases/compiler/functionParameterArityMismatch.ts] ////

//// [functionParameterArityMismatch.ts]
declare function f1(a: number);
declare function f1(a: number, b: number, c: number);
f1();
f1(1, 2);
f1(1, 2, 3, 4);

declare function f2();
declare function f2(a: number, b: number);
declare function f2(a: number, b: number, c: number, d: number);
declare function f2(a: number, b: number, c: number, d: number, e: number, f: number);
f2(1);
f2(1, 2, 3);
f2(1, 2, 3, 4, 5);
f2(1, 2, 3, 4, 5, 6, 7);
f2(1, 2, 3, 4, 5, ...[6, 7]);


//// [functionParameterArityMismatch.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
f1();
f1(1, 2);
f1(1, 2, 3, 4);
f2(1);
f2(1, 2, 3);
f2(1, 2, 3, 4, 5);
f2(1, 2, 3, 4, 5, 6, 7);
f2.apply(void 0, __spreadArray([1, 2, 3, 4, 5], [6, 7], false));
