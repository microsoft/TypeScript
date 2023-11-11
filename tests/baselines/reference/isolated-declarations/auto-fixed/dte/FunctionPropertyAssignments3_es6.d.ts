//// [tests/cases/conformance/es6/functionPropertyAssignments/FunctionPropertyAssignments3_es6.ts] ////

//// [FunctionPropertyAssignments3_es6.ts]
var v = { *{ } }

/// [Declarations] ////



//// [/.src/FunctionPropertyAssignments3_es6.d.ts]
declare var v: invalid;
/// [Errors] ////

FunctionPropertyAssignments3_es6.ts(1,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
FunctionPropertyAssignments3_es6.ts(1,12): error TS1003: Identifier expected.


==== FunctionPropertyAssignments3_es6.ts (2 errors) ====
    var v = { *{ } }
               
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
               ~
!!! error TS1003: Identifier expected.