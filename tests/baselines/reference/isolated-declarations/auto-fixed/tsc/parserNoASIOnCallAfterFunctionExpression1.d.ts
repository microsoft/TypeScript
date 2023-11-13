//// [tests/cases/conformance/parser/ecmascript5/parserNoASIOnCallAfterFunctionExpression1.ts] ////

//// [parserNoASIOnCallAfterFunctionExpression1.ts]
var x = function (): void { }
(<any>window).foo;


/// [Declarations] ////



//// [parserNoASIOnCallAfterFunctionExpression1.d.ts]
declare var x: any;
/// [Errors] ////

parserNoASIOnCallAfterFunctionExpression1.ts(2,2): error TS2554: Expected 0 arguments, but got 1.
parserNoASIOnCallAfterFunctionExpression1.ts(2,15): error TS2339: Property 'foo' does not exist on type 'void'.


==== parserNoASIOnCallAfterFunctionExpression1.ts (2 errors) ====
    var x = function (): void { }
    (<any>window).foo;
     ~~~~~~~~~~~
!!! error TS2554: Expected 0 arguments, but got 1.
                  ~~~
!!! error TS2339: Property 'foo' does not exist on type 'void'.
    