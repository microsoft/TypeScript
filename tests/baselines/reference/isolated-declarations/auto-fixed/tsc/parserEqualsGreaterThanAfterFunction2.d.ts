//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserEqualsGreaterThanAfterFunction2.ts] ////

//// [parserEqualsGreaterThanAfterFunction2.ts]
function (a: any => b: any;

/// [Declarations] ////



//// [parserEqualsGreaterThanAfterFunction2.d.ts]
declare function (a: any, b: any): any;
/// [Errors] ////

parserEqualsGreaterThanAfterFunction2.ts(1,10): error TS1003: Identifier expected.
parserEqualsGreaterThanAfterFunction2.ts(1,18): error TS1005: ',' expected.
parserEqualsGreaterThanAfterFunction2.ts(1,27): error TS1005: ',' expected.
parserEqualsGreaterThanAfterFunction2.ts(1,28): error TS1005: ')' expected.


==== parserEqualsGreaterThanAfterFunction2.ts (4 errors) ====
    function (a: any => b: any;
             ~
!!! error TS1003: Identifier expected.
                     ~~
!!! error TS1005: ',' expected.
                              ~
!!! error TS1005: ',' expected.
                               
!!! error TS1005: ')' expected.