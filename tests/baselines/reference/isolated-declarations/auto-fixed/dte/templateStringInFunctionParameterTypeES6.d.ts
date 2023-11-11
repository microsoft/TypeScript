//// [tests/cases/conformance/es6/templates/templateStringInFunctionParameterTypeES6.ts] ////

//// [templateStringInFunctionParameterTypeES6.ts]
function f(: any: any`hello`): any;
function f(x: string): any;
function f(x: string) {
    return x;
}

/// [Declarations] ////



//// [/.src/templateStringInFunctionParameterTypeES6.d.ts]
declare function f(any: any, : invalid): any;
declare function f(x: string): any;
/// [Errors] ////

templateStringInFunctionParameterTypeES6.ts(1,12): error TS1138: Parameter declaration expected.
templateStringInFunctionParameterTypeES6.ts(1,22): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
templateStringInFunctionParameterTypeES6.ts(1,22): error TS1005: ',' expected.


==== templateStringInFunctionParameterTypeES6.ts (3 errors) ====
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