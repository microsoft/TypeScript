//// [betterErrorForAccidentallyCallingTypeAssertionExpressions.ts]
declare function foo(): string;

foo()(1 as number).toString();

foo()   (1 as number).toString();

foo()
(1 as number).toString();

foo()   
    (1 as number).toString();


//// [betterErrorForAccidentallyCallingTypeAssertionExpressions.js]
foo()(1).toString();
foo()(1).toString();
foo()(1).toString();
foo()(1).toString();
