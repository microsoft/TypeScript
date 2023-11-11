//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserEqualsGreaterThanAfterFunction1.ts] ////

//// [parserEqualsGreaterThanAfterFunction1.ts]
function =>

/// [Declarations] ////



//// [/.src/parserEqualsGreaterThanAfterFunction1.d.ts]
declare function (): invalid;
/// [Errors] ////

parserEqualsGreaterThanAfterFunction1.ts(1,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserEqualsGreaterThanAfterFunction1.ts(1,10): error TS1003: Identifier expected.


==== parserEqualsGreaterThanAfterFunction1.ts (2 errors) ====
    function =>
            
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~
!!! error TS1003: Identifier expected.