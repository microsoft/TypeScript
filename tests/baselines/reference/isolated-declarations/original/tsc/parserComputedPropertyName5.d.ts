//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName5.ts] ////

//// [parserComputedPropertyName5.ts]
var v = { public get [e]() { } };

/// [Declarations] ////



//// [parserComputedPropertyName5.d.ts]
declare var v: invalid;

/// [Errors] ////

parserComputedPropertyName5.ts(1,11): error TS1042: 'public' modifier cannot be used here.
parserComputedPropertyName5.ts(1,22): error TS2378: A 'get' accessor must return a value.
parserComputedPropertyName5.ts(1,22): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
parserComputedPropertyName5.ts(1,22): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
parserComputedPropertyName5.ts(1,23): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName5.ts (5 errors) ====
    var v = { public get [e]() { } };
              ~~~~~~
!!! error TS1042: 'public' modifier cannot be used here.
                         ~~~
!!! error TS2378: A 'get' accessor must return a value.
                         ~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9032 parserComputedPropertyName5.ts:1:22: Add a return type to the get accessor declaration
                         ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 parserComputedPropertyName5.ts:1:5: Add a type annotation to the variable v
                          ~
!!! error TS2304: Cannot find name 'e'.