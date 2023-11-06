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



//// [/.src/computedPropertyNames2_ES6.d.ts]
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

computedPropertyNames2_ES6.ts(4,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames2_ES6.ts(5,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames2_ES6.ts(6,9): error TS2378: A 'get' accessor must return a value.
computedPropertyNames2_ES6.ts(6,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames2_ES6.ts(7,24): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames2_ES6.ts(8,16): error TS2378: A 'get' accessor must return a value.
computedPropertyNames2_ES6.ts(8,16): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNames2_ES6.ts(9,31): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== computedPropertyNames2_ES6.ts (8 errors) ====
    var methodName = "method";
    var accessorName = "accessor";
    class C {
        [methodName]() { }
        ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static [methodName]() { }
               ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        get [accessorName]() { }
            ~~~~~~~~~~~~~~
!!! error TS2378: A 'get' accessor must return a value.
            ~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        set [accessorName](v) { }
                           ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static get [accessorName]() { }
                   ~~~~~~~~~~~~~~
!!! error TS2378: A 'get' accessor must return a value.
                   ~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        static set [accessorName](v) { }
                                  ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }