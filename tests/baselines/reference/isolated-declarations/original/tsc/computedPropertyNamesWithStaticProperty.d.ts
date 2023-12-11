//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesWithStaticProperty.ts] ////

//// [computedPropertyNamesWithStaticProperty.ts]
class C {
class C1 {
    static staticProp = 10;
    get [C1.staticProp]() {
        return "hello";
    }
    set [C1.staticProp](x: string) {
        var y = x;
    }
    [C1.staticProp]() { }
}

(class C2 {
    static staticProp = 10;
    get [C2.staticProp]() {
        return "hello";
    }
    set [C2.staticProp](x: string) {
        var y = x;
    }
    [C2.staticProp]() { }
})


/// [Declarations] ////



//// [computedPropertyNamesWithStaticProperty.d.ts]
declare class C {
}
declare class C1 {
    static staticProp: number;
    get [C1.staticProp](): invalid;
    set [C1.staticProp](x: string);
    [C1.staticProp](): invalid;
}

/// [Errors] ////

computedPropertyNamesWithStaticProperty.ts(2,1): error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
computedPropertyNamesWithStaticProperty.ts(4,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNamesWithStaticProperty.ts(4,10): error TS2449: Class 'C1' used before its declaration.
computedPropertyNamesWithStaticProperty.ts(7,9): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNamesWithStaticProperty.ts(7,10): error TS2449: Class 'C1' used before its declaration.
computedPropertyNamesWithStaticProperty.ts(10,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
computedPropertyNamesWithStaticProperty.ts(10,6): error TS2449: Class 'C1' used before its declaration.
computedPropertyNamesWithStaticProperty.ts(15,10): error TS2449: Class 'C2' used before its declaration.
computedPropertyNamesWithStaticProperty.ts(18,10): error TS2449: Class 'C2' used before its declaration.
computedPropertyNamesWithStaticProperty.ts(21,6): error TS2449: Class 'C2' used before its declaration.


==== computedPropertyNamesWithStaticProperty.ts (10 errors) ====
    class C {
    class C1 {
    ~~~~~
!!! error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
        static staticProp = 10;
        get [C1.staticProp]() {
            ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~
!!! error TS2449: Class 'C1' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:2:7: 'C1' is declared here.
            return "hello";
        }
        set [C1.staticProp](x: string) {
            ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
             ~~
!!! error TS2449: Class 'C1' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:2:7: 'C1' is declared here.
            var y = x;
        }
        [C1.staticProp]() { }
        ~~~~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
         ~~
!!! error TS2449: Class 'C1' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:2:7: 'C1' is declared here.
    }
    
    (class C2 {
        static staticProp = 10;
        get [C2.staticProp]() {
             ~~
!!! error TS2449: Class 'C2' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:13:8: 'C2' is declared here.
            return "hello";
        }
        set [C2.staticProp](x: string) {
             ~~
!!! error TS2449: Class 'C2' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:13:8: 'C2' is declared here.
            var y = x;
        }
        [C2.staticProp]() { }
         ~~
!!! error TS2449: Class 'C2' used before its declaration.
!!! related TS2728 computedPropertyNamesWithStaticProperty.ts:13:8: 'C2' is declared here.
    })
    