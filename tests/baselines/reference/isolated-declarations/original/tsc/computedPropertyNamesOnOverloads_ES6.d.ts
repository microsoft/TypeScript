//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesOnOverloads_ES6.ts] ////

//// [computedPropertyNamesOnOverloads_ES6.ts]
var methodName = "method";
var accessorName = "accessor";
class C {
    [methodName](v: string);
    [methodName]();
    [methodName](v?: string) { }
}

/// [Declarations] ////



//// [computedPropertyNamesOnOverloads_ES6.d.ts]
declare var methodName: string;
declare var accessorName: string;
declare class C {
    [methodName](v: string): invalid;
    [methodName](): invalid;
    [methodName](v?: string): invalid;
}

/// [Errors] ////

computedPropertyNamesOnOverloads_ES6.ts(4,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
computedPropertyNamesOnOverloads_ES6.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
computedPropertyNamesOnOverloads_ES6.ts(4,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNamesOnOverloads_ES6.ts(5,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
computedPropertyNamesOnOverloads_ES6.ts(5,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
computedPropertyNamesOnOverloads_ES6.ts(5,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
computedPropertyNamesOnOverloads_ES6.ts(6,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
computedPropertyNamesOnOverloads_ES6.ts(6,5): error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations


==== computedPropertyNamesOnOverloads_ES6.ts (8 errors) ====
    var methodName = "method";
    var accessorName = "accessor";
    class C {
        [methodName](v: string);
        ~~~~~~~~~~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 computedPropertyNamesOnOverloads_ES6.ts:4:5: Add a return type to the method
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        [methodName]();
        ~~~~~~~~~~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 computedPropertyNamesOnOverloads_ES6.ts:5:5: Add a return type to the method
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
        [methodName](v?: string) { }
        ~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 computedPropertyNamesOnOverloads_ES6.ts:6:5: Add a return type to the method
        ~~~~~~~~~~~~
!!! error TS9014: Computed properties must be number or string literals, variables or dotted expressions with --isolatedDeclarations
    }