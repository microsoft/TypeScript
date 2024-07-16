//// [tests/cases/compiler/thisPredicateInObjectLiteral.ts] ////

//// [thisPredicateInObjectLiteral.ts]
// Should be OK
const foo2 = {
    isNumber(): this is { b: string } {
        return true;
    },
};

//// [thisPredicateInObjectLiteral.js]
"use strict";
// Should be OK
var foo2 = {
    isNumber: function () {
        return true;
    },
};
