//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames2_ES5.ts] ////

//// [computedPropertyNames2_ES5.ts]
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



//// [computedPropertyNames2_ES5.d.ts]
declare var methodName: string;
declare var accessorName: string;
declare class C {
    [methodName](): invalid;
    static [methodName](): invalid;
    get [accessorName](): invalid;
    set [accessorName](v: invalid);
    static get [accessorName](): invalid;
    static set [accessorName](v: invalid);
}

/// [Errors] ////

computedPropertyNames2_ES5.ts(4,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
computedPropertyNames2_ES5.ts(5,12): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
computedPropertyNames2_ES5.ts(6,9): error TS2378: A 'get' accessor must return a value.
computedPropertyNames2_ES5.ts(6,9): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
computedPropertyNames2_ES5.ts(8,16): error TS2378: A 'get' accessor must return a value.
computedPropertyNames2_ES5.ts(8,16): error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations


==== computedPropertyNames2_ES5.ts (6 errors) ====
    var methodName = "method";
    var accessorName = "accessor";
    class C {
        [methodName]() { }
        ~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 computedPropertyNames2_ES5.ts:4:5: Add a return type to the method
        static [methodName]() { }
               ~~~~~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 computedPropertyNames2_ES5.ts:5:12: Add a return type to the method
        get [accessorName]() { }
            ~~~~~~~~~~~~~~
!!! error TS2378: A 'get' accessor must return a value.
            ~~~~~~~~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 computedPropertyNames2_ES5.ts:7:9: Add a type to parameter of the set accessor declaration
!!! related TS9032 computedPropertyNames2_ES5.ts:6:9: Add a return type to the get accessor declaration
        set [accessorName](v) { }
        static get [accessorName]() { }
                   ~~~~~~~~~~~~~~
!!! error TS2378: A 'get' accessor must return a value.
                   ~~~~~~~~~~~~~~
!!! error TS9009: At least one accessor must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9033 computedPropertyNames2_ES5.ts:9:16: Add a type to parameter of the set accessor declaration
!!! related TS9032 computedPropertyNames2_ES5.ts:8:16: Add a return type to the get accessor declaration
        static set [accessorName](v) { }
    }