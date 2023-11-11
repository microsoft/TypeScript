//// [tests/cases/conformance/es6/templates/templateStringInFunctionParameterType.ts] ////

//// [templateStringInFunctionParameterType.ts]
function f(: any: any`hello`): any;
function f(x: string): any;
function f(x: string) {
    return x;
}

/// [Declarations] ////



//// [/.src/templateStringInFunctionParameterType.d.ts]
declare function f(any: any, : invalid): any;
declare function f(x: string): any;
/// [Errors] ////

templateStringInFunctionParameterType.ts(1,12): error TS1138: Parameter declaration expected.
templateStringInFunctionParameterType.ts(1,22): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
templateStringInFunctionParameterType.ts(1,22): error TS1005: ',' expected.


==== templateStringInFunctionParameterType.ts (3 errors) ====
    function f(: any: any`hello`): any;
               ~
!!! error TS1138: Parameter declaration expected.
                         
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
                         ~~~~~~~
!!! error TS1005: ',' expected.
    function f(x: string): any;
    function f(x: string) {
        return x;
    }