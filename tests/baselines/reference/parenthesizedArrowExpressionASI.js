//// [tests/cases/compiler/parenthesizedArrowExpressionASI.ts] ////

//// [parenthesizedArrowExpressionASI.ts]
const x = (a: any[]) => (
    // comment
    undefined as number
);


//// [parenthesizedArrowExpressionASI.js]
var x = function (a) { return (
// comment
undefined); };
