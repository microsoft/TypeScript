//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName3.ts] ////

//// [parserComputedPropertyName3.ts]
var v = { [e]() { } };

/// [Declarations] ////



//// [parserComputedPropertyName3.d.ts]
declare var v: invalid;

/// [Errors] ////

parserComputedPropertyName3.ts(1,11): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
parserComputedPropertyName3.ts(1,11): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
parserComputedPropertyName3.ts(1,12): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName3.ts (3 errors) ====
    var v = { [e]() { } };
              ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 parserComputedPropertyName3.ts:1:5: Add a type annotation to the variable v.
!!! related TS9034 parserComputedPropertyName3.ts:1:11: Add a return type to the method
              ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 parserComputedPropertyName3.ts:1:5: Add a type annotation to the variable v.
               ~
!!! error TS2304: Cannot find name 'e'.