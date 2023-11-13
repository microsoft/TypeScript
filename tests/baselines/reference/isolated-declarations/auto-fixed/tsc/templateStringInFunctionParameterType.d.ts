//// [tests/cases/conformance/es6/templates/templateStringInFunctionParameterType.ts] ////

//// [templateStringInFunctionParameterType.ts]
function f(: any: any`hello`): any;
function f(x: string): any;
function f(x: string) {
    return x;
}

/// [Declarations] ////



//// [templateStringInFunctionParameterType.d.ts]
declare function f(any: any, : any): any;
declare function f(x: string): any;
/// [Errors] ////

templateStringInFunctionParameterType.ts(1,12): error TS1138: Parameter declaration expected.
templateStringInFunctionParameterType.ts(1,22): error TS1005: ',' expected.


==== templateStringInFunctionParameterType.ts (2 errors) ====
    function f(: any: any`hello`): any;
               ~
!!! error TS1138: Parameter declaration expected.
                         ~~~~~~~
!!! error TS1005: ',' expected.
    function f(x: string): any;
    function f(x: string) {
        return x;
    }