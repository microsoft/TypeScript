//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/ParameterLists/parserErrorRecovery_ParameterList1.ts] ////

//// [parserErrorRecovery_ParameterList1.ts]
function f(a: any {
}: {}

/// [Declarations] ////



//// [parserErrorRecovery_ParameterList1.d.ts]
declare function f(a: any, {}: {}): any;

/// [Errors] ////

parserErrorRecovery_ParameterList1.ts(1,10): error TS2391: Function implementation is missing or not immediately following the declaration.
parserErrorRecovery_ParameterList1.ts(1,19): error TS1005: ',' expected.
parserErrorRecovery_ParameterList1.ts(2,6): error TS1005: ')' expected.


==== parserErrorRecovery_ParameterList1.ts (3 errors) ====
    function f(a: any {
             ~
!!! error TS2391: Function implementation is missing or not immediately following the declaration.
                      ~
!!! error TS1005: ',' expected.
    }: {}
         
!!! error TS1005: ')' expected.