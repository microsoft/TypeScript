//// [functionExpressionReturningItself.ts]
var x = function somefn() { return somefn; };

//// [functionExpressionReturningItself.js]
var x = function somefn() {
    return somefn;
};


//// [functionExpressionReturningItself.d.ts]
declare var x: () => typeof somefn;


//// [DtsFileErrors]


==== tests/cases/compiler/functionExpressionReturningItself.d.ts (1 errors) ====
    declare var x: () => typeof somefn;
                                ~~~~~~
!!! Cannot find name 'somefn'.
    