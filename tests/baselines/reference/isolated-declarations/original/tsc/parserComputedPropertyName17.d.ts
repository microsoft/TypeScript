//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName17.ts] ////

//// [parserComputedPropertyName17.ts]
var v = { set [e](v) { } }

/// [Declarations] ////



//// [parserComputedPropertyName17.d.ts]
declare var v: invalid;

/// [Errors] ////

parserComputedPropertyName17.ts(1,15): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
parserComputedPropertyName17.ts(1,16): error TS2304: Cannot find name 'e'.
parserComputedPropertyName17.ts(1,19): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.


==== parserComputedPropertyName17.ts (3 errors) ====
    var v = { set [e](v) { } }
                  ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 parserComputedPropertyName17.ts:1:5: Add a type annotation to the variable v.
                   ~
!!! error TS2304: Cannot find name 'e'.
                      ~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9033 parserComputedPropertyName17.ts:1:15: Add a type to parameter of the set accessor declaration.