//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserEqualsGreaterThanAfterFunction1.ts] ////

//// [parserEqualsGreaterThanAfterFunction1.ts]
function =>

/// [Declarations] ////



//// [/.src/parserEqualsGreaterThanAfterFunction1.d.ts]
declare function (): any;
/// [Errors] ////

parserEqualsGreaterThanAfterFunction1.ts(1,10): error TS1003: Identifier expected.


==== parserEqualsGreaterThanAfterFunction1.ts (1 errors) ====
    function =>
             ~~
!!! error TS1003: Identifier expected.