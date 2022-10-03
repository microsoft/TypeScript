//// [betterErrorForAccidentalCall.ts]
declare function foo(): string;

foo()(1 as number).toString();

foo()   (1 as number).toString();

foo()
(1 as number).toString();

foo()
    (1 + 2).toString();

foo()
    (<number>1).toString();


//// [betterErrorForAccidentalCall.js]
foo()(1).toString();
foo()(1).toString();
foo()(1).toString();
foo()(1 + 2).toString();
foo()(1).toString();
