//// [tests/cases/compiler/parenthesizedArrowExpressionASI.ts] ////

//// [parenthesizedArrowExpressionASI.ts]
const x = (a: any[]) => (
    // comment
    undefined as number
);


//// [parenthesizedArrowExpressionASI.js]
"use strict";
var x = function (a) { return (
// comment
undefined); };
