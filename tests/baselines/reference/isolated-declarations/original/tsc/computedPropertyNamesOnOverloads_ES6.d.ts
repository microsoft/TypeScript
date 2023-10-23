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



//// [/.src/computedPropertyNamesOnOverloads_ES6.d.ts]
declare var methodName: string;
declare var accessorName: string;
declare class C {
    [methodName](v: string): invalid;
    [methodName](): invalid;
    [methodName](v?: string): invalid;
}
/// [Errors] ////

computedPropertyNamesOnOverloads_ES6.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNamesOnOverloads_ES6.ts(5,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNamesOnOverloads_ES6.ts(6,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== computedPropertyNamesOnOverloads_ES6.ts (3 errors) ====
    var methodName = "method";
    var accessorName = "accessor";
    class C {
        [methodName](v: string);
        ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [methodName]();
        ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [methodName](v?: string) { }
        ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }