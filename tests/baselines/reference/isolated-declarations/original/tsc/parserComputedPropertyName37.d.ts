//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName37.ts] ////

//// [parserComputedPropertyName37.ts]
var v = {
    [public]: 0
};

/// [Declarations] ////



//// [parserComputedPropertyName37.d.ts]
declare var v: invalid;

/// [Errors] ////

parserComputedPropertyName37.ts(2,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
parserComputedPropertyName37.ts(2,6): error TS2304: Cannot find name 'public'.


==== parserComputedPropertyName37.ts (2 errors) ====
    var v = {
        [public]: 0
        ~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 parserComputedPropertyName37.ts:1:5: Add a type annotation to the variable v
         ~~~~~~
!!! error TS2304: Cannot find name 'public'.
    };