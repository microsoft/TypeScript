//// [tests/cases/conformance/parser/ecmascript5/parserNoASIOnCallAfterFunctionExpression1.ts] ////

//// [parserNoASIOnCallAfterFunctionExpression1.ts]
var x = function (): void { }
(<any>window).foo;


/// [Declarations] ////



//// [/.src/parserNoASIOnCallAfterFunctionExpression1.d.ts]
declare var x: invalid;
/// [Errors] ////

parserNoASIOnCallAfterFunctionExpression1.ts(1,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserNoASIOnCallAfterFunctionExpression1.ts(2,2): error TS2554: Expected 0 arguments, but got 1.
parserNoASIOnCallAfterFunctionExpression1.ts(2,15): error TS2339: Property 'foo' does not exist on type 'void'.


==== parserNoASIOnCallAfterFunctionExpression1.ts (3 errors) ====
    var x = function (): void { }
            ~~~~~~~~~~~~~~~~~~~~~
    (<any>window).foo;
    ~~~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
     ~~~~~~~~~~~
!!! error TS2554: Expected 0 arguments, but got 1.
                  ~~~
!!! error TS2339: Property 'foo' does not exist on type 'void'.
    