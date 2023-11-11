//// [tests/cases/conformance/es6/templates/templateStringInFunctionParameterTypeES6.ts] ////

//// [templateStringInFunctionParameterTypeES6.ts]
function f(: any: any`hello`): any;
function f(x: string): any;
function f(x: string) {
    return x;
}

/// [Declarations] ////



//// [/.src/templateStringInFunctionParameterTypeES6.d.ts]
declare function f(any: any, : any): any;
declare function f(x: string): any;
/// [Errors] ////

templateStringInFunctionParameterTypeES6.ts(1,12): error TS1138: Parameter declaration expected.
templateStringInFunctionParameterTypeES6.ts(1,22): error TS1005: ',' expected.


==== templateStringInFunctionParameterTypeES6.ts (2 errors) ====
    function f(: any: any`hello`): any;
               ~
!!! error TS1138: Parameter declaration expected.
                         ~~~~~~~
!!! error TS1005: ',' expected.
    function f(x: string): any;
    function f(x: string) {
        return x;
    }