//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames2_ES6.ts] ////

//// [computedPropertyNames2_ES6.ts]
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName]() { }
    static [methodName]() { }
    get [accessorName]() { }
    set [accessorName](v) { }
    static get [accessorName]() { }
    static set [accessorName](v) { }
}

/// [Declarations] ////



//// [computedPropertyNames2_ES6.d.ts]
declare var methodName: string;
declare var accessorName: string;
declare class C {
}

/// [Errors] ////

computedPropertyNames2_ES6.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames2_ES6.ts(5,12): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames2_ES6.ts(6,9): error TS2378: A 'get' accessor must return a value.
computedPropertyNames2_ES6.ts(6,9): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames2_ES6.ts(7,9): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames2_ES6.ts(8,16): error TS2378: A 'get' accessor must return a value.
computedPropertyNames2_ES6.ts(8,16): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNames2_ES6.ts(9,16): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== computedPropertyNames2_ES6.ts (8 errors) ====
    var methodName = "method";
    var accessorName = "accessor";
    class C {
        [methodName]() { }
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        static [methodName]() { }
               ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        get [accessorName]() { }
            ~~~~~~~~~~~~~~
!!! error TS2378: A 'get' accessor must return a value.
            ~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        set [accessorName](v) { }
            ~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        static get [accessorName]() { }
                   ~~~~~~~~~~~~~~
!!! error TS2378: A 'get' accessor must return a value.
                   ~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        static set [accessorName](v) { }
                   ~~~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
    }