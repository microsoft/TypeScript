//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName2.ts] ////

//// [parserES5ComputedPropertyName2.ts]
var v = { [e]: 1 };

/// [Declarations] ////



//// [parserES5ComputedPropertyName2.d.ts]
declare var v: invalid;

/// [Errors] ////

parserES5ComputedPropertyName2.ts(1,11): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
parserES5ComputedPropertyName2.ts(1,12): error TS2304: Cannot find name 'e'.


==== parserES5ComputedPropertyName2.ts (2 errors) ====
    var v = { [e]: 1 };
              ~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
!!! related TS9027 parserES5ComputedPropertyName2.ts:1:5: Add a type annotation to the variable v.
               ~
!!! error TS2304: Cannot find name 'e'.