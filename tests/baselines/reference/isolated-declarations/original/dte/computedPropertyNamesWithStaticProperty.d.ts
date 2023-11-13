//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesWithStaticProperty.ts] ////

//// [computedPropertyNamesWithStaticProperty.ts]
class C {
    static staticProp = 10;
    get [C.staticProp]() {
        return "hello";
    }
    set [C.staticProp](x: string) {
        var y = x;
    }
    [C.staticProp]() { }
}

/// [Declarations] ////



//// [computedPropertyNamesWithStaticProperty.d.ts]
declare class C {
    static staticProp: number;
    get [C.staticProp](): invalid;
    set [C.staticProp](x: string);
    [C.staticProp](): invalid;
}
/// [Errors] ////

computedPropertyNamesWithStaticProperty.ts(3,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNamesWithStaticProperty.ts(3,10): error TS2449: Class 'C' used before its declaration.
computedPropertyNamesWithStaticProperty.ts(6,10): error TS2449: Class 'C' used before its declaration.
computedPropertyNamesWithStaticProperty.ts(9,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNamesWithStaticProperty.ts(9,6): error TS2449: Class 'C' used before its declaration.


==== computedPropertyNamesWithStaticProperty.ts (5 errors) ====
    class C {
        static staticProp = 10;
        get [C.staticProp]() {
            ~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~
!!! error TS2449: Class 'C' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:1:7: 'C' is declared here.
            return "hello";
        }
        set [C.staticProp](x: string) {
             ~
!!! error TS2449: Class 'C' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:1:7: 'C' is declared here.
            var y = x;
        }
        [C.staticProp]() { }
        ~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
         ~
!!! error TS2449: Class 'C' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:1:7: 'C' is declared here.
    }