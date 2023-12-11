//// [tests/cases/conformance/es6/Symbols/symbolProperty54.ts] ////

//// [symbolProperty54.ts]
var obj = {
    [Symbol.prototype]: 0
};

/// [Declarations] ////



//// [symbolProperty54.d.ts]
declare var obj: invalid;

/// [Errors] ////

symbolProperty54.ts(2,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
symbolProperty54.ts(2,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== symbolProperty54.ts (2 errors) ====
    var obj = {
        [Symbol.prototype]: 0
        ~~~~~~~~~~~~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
        ~~~~~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
!!! related TS9027 symbolProperty54.ts:1:5: Add a type annotation to the variable obj
    };