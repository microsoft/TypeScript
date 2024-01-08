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
    [methodName](v: string): invalid;
    [methodName](): invalid;
}

/// [Errors] ////

computedPropertyNamesOnOverloads_ES5.ts(4,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
computedPropertyNamesOnOverloads_ES5.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
computedPropertyNamesOnOverloads_ES5.ts(5,5): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
computedPropertyNamesOnOverloads_ES5.ts(5,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.


==== computedPropertyNamesOnOverloads_ES5.ts (4 errors) ====
    var methodName = "method";
    var accessorName = "accessor";
    class C {
        [methodName](v: string);
        ~~~~~~~~~~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNamesOnOverloads_ES5.ts:4:5: Add a return type to the method
        [methodName]();
        ~~~~~~~~~~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 computedPropertyNamesOnOverloads_ES5.ts:5:5: Add a return type to the method
        [methodName](v?: string) { }
    }