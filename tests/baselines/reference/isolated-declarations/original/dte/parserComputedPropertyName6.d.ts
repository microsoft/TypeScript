//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName6.ts] ////

//// [parserComputedPropertyName6.ts]
var v = { [e]: 1, [e + e]: 2 };

/// [Declarations] ////



//// [parserComputedPropertyName6.d.ts]
declare var v: invalid;

/// [Errors] ////

parserComputedPropertyName6.ts(1,12): error TS2304: Cannot find name 'e'.
parserComputedPropertyName6.ts(1,19): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
parserComputedPropertyName6.ts(1,20): error TS2304: Cannot find name 'e'.
parserComputedPropertyName6.ts(1,24): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName6.ts (4 errors) ====
    var v = { [e]: 1, [e + e]: 2 };
               ~
!!! error TS2304: Cannot find name 'e'.
                      ~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 parserComputedPropertyName6.ts:1:5: Add a type annotation to the variable v
                       ~
!!! error TS2304: Cannot find name 'e'.
                           ~
!!! error TS2304: Cannot find name 'e'.