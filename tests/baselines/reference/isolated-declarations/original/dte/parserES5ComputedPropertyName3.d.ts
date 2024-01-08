//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName3.ts] ////

//// [parserES5ComputedPropertyName3.ts]
var v = { [e]() { } };

/// [Declarations] ////



//// [parserES5ComputedPropertyName3.d.ts]
declare var v: invalid;

/// [Errors] ////

parserES5ComputedPropertyName3.ts(1,11): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
parserES5ComputedPropertyName3.ts(1,12): error TS2304: Cannot find name 'e'.


==== parserES5ComputedPropertyName3.ts (2 errors) ====
    var v = { [e]() { } };
              ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9027 parserES5ComputedPropertyName3.ts:1:5: Add a type annotation to the variable v.
!!! related TS9034 parserES5ComputedPropertyName3.ts:1:11: Add a return type to the method
               ~
!!! error TS2304: Cannot find name 'e'.