//// [tests/cases/conformance/es6/functionPropertyAssignments/FunctionPropertyAssignments3_es6.ts] ////

//// [FunctionPropertyAssignments3_es6.ts]
var v = { *{ } }

/// [Declarations] ////



//// [FunctionPropertyAssignments3_es6.d.ts]
declare var v: {
    ""(): Generator<never, void, unknown>;
};
/// [Errors] ////

FunctionPropertyAssignments3_es6.ts(1,12): error TS1003: Identifier expected.


==== FunctionPropertyAssignments3_es6.ts (1 errors) ====
    var v = { *{ } }
               ~
!!! error TS1003: Identifier expected.