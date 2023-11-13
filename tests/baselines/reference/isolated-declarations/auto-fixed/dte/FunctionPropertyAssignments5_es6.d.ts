//// [tests/cases/conformance/es6/functionPropertyAssignments/FunctionPropertyAssignments5_es6.ts] ////

//// [FunctionPropertyAssignments5_es6.ts]
var v = { *[foo()](): Generator<never, void, unknown> { } }

/// [Declarations] ////



//// [FunctionPropertyAssignments5_es6.d.ts]
declare var v: invalid;

/// [Errors] ////

FunctionPropertyAssignments5_es6.ts(1,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
FunctionPropertyAssignments5_es6.ts(1,13): error TS2304: Cannot find name 'foo'.


==== FunctionPropertyAssignments5_es6.ts (2 errors) ====
    var v = { *[foo()](): Generator<never, void, unknown> { } }
               ~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                ~~~
!!! error TS2304: Cannot find name 'foo'.