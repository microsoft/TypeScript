//// [tests/cases/compiler/parenthesizedArrowExpressionASI.ts] ////

//// [parenthesizedArrowExpressionASI.ts]
const x = (a: any[]) => (
    // comment
    undefined as number
);


//// [parenthesizedArrowExpressionASI.js]
const x = (a) => 
// comment
undefined;
