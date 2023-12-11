//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName4.ts] ////

//// [parserComputedPropertyName4.ts]
var v = { get [e]() { } };

/// [Declarations] ////



//// [parserComputedPropertyName4.d.ts]
declare var v: invalid;

/// [Errors] ////

parserComputedPropertyName4.ts(1,15): error TS2378: A 'get' accessor must return a value.
parserComputedPropertyName4.ts(1,15): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
parserComputedPropertyName4.ts(1,16): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName4.ts (3 errors) ====
    var v = { get [e]() { } };
                  ~~~
!!! error TS2378: A 'get' accessor must return a value.
                  ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9032 parserComputedPropertyName4.ts:1:15: Add a return type to the get accessor declaration
                   ~
!!! error TS2304: Cannot find name 'e'.