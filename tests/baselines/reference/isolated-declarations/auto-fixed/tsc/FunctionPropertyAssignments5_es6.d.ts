//// [tests/cases/conformance/es6/functionPropertyAssignments/FunctionPropertyAssignments5_es6.ts] ////

//// [FunctionPropertyAssignments5_es6.ts]
var v = { *[foo()](): Generator<never, void, unknown> { } }

/// [Declarations] ////



//// [/.src/FunctionPropertyAssignments5_es6.d.ts]
declare var v: {
    [x: number]: () => Generator<never, void, unknown>;
};
/// [Errors] ////

FunctionPropertyAssignments5_es6.ts(1,13): error TS2304: Cannot find name 'foo'.


==== FunctionPropertyAssignments5_es6.ts (1 errors) ====
    var v = { *[foo()](): Generator<never, void, unknown> { } }
                ~~~
!!! error TS2304: Cannot find name 'foo'.