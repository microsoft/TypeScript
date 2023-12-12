//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName4.ts] ////

//// [parserES5ComputedPropertyName4.ts]
var v = { get [e]() { } };

/// [Declarations] ////



//// [parserES5ComputedPropertyName4.d.ts]
declare var v: invalid;

/// [Errors] ////

parserES5ComputedPropertyName4.ts(1,15): error TS2378: A 'get' accessor must return a value.
parserES5ComputedPropertyName4.ts(1,15): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
parserES5ComputedPropertyName4.ts(1,16): error TS2304: Cannot find name 'e'.


==== parserES5ComputedPropertyName4.ts (3 errors) ====
    var v = { get [e]() { } };
                  ~~~
!!! error TS2378: A 'get' accessor must return a value.
                  ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9032 parserES5ComputedPropertyName4.ts:1:15: Add a return type to the get accessor declaration.
                   ~
!!! error TS2304: Cannot find name 'e'.