//// [functionExpressionReturnTypeNotFresh.ts]
const a = () => ({
    a: 12,
    b: 11
});

declare function f(arg: {a: number}): void;
f(a());

//// [functionExpressionReturnTypeNotFresh.js]
"use strict";
var a = function () { return ({
    a: 12,
    b: 11
}); };
f(a());
