//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ParameterLists/parserErrorRecovery_ParameterList2.ts] ////

//// [parserErrorRecovery_ParameterList2.ts]
function f(a: any, {
}: {}

/// [Declarations] ////



//// [/.src/parserErrorRecovery_ParameterList2.d.ts]
declare function f(a: any, {}: {}): any;
/// [Errors] ////

parserErrorRecovery_ParameterList2.ts(1,10): error TS2391: Function implementation is missing or not immediately following the declaration.
parserErrorRecovery_ParameterList2.ts(2,6): error TS1005: ')' expected.


==== parserErrorRecovery_ParameterList2.ts (2 errors) ====
    function f(a: any, {
             ~
!!! error TS2391: Function implementation is missing or not immediately following the declaration.
    }: {}
         
!!! error TS1005: ')' expected.