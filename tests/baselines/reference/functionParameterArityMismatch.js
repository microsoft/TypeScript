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
f2(...[1], 2, 3, 4, 5, 6);


//// [functionParameterArityMismatch.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
f1();
f1(1, 2);
f1(1, 2, 3, 4);
f2(1);
f2(1, 2, 3);
f2(1, 2, 3, 4, 5);
f2(1, 2, 3, 4, 5, 6, 7);
f2.apply(void 0, __spreadArray(__spreadArray([], [1]), [2, 3, 4, 5, 6]));
