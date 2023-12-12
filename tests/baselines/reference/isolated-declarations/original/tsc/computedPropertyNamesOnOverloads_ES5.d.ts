//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesOnOverloads_ES5.ts] ////

//// [computedPropertyNamesOnOverloads_ES5.ts]
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName](v: string);
    [methodName]();
    [methodName](v?: string) { }
}

/// [Declarations] ////



//// [computedPropertyNamesOnOverloads_ES5.d.ts]
declare var methodName: string;
declare var accessorName: string;
declare class C {
}

/// [Errors] ////

computedPropertyNamesOnOverloads_ES5.ts(4,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
computedPropertyNamesOnOverloads_ES5.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNamesOnOverloads_ES5.ts(5,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
computedPropertyNamesOnOverloads_ES5.ts(5,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
computedPropertyNamesOnOverloads_ES5.ts(6,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.


==== computedPropertyNamesOnOverloads_ES5.ts (5 errors) ====
    var methodName = "method";
    var accessorName = "accessor";
    class C {
        [methodName](v: string);
        ~~~~~~~~~~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
        [methodName]();
        ~~~~~~~~~~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
        [methodName](v?: string) { }
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations.
    }