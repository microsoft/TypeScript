//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName25.ts] ////

//// [parserComputedPropertyName25.ts]
class C {
    // No ASI
    [e] = 0
    [e2] = 1
}

/// [Declarations] ////



//// [parserComputedPropertyName25.d.ts]
declare class C {
    [e]: invalid;
}

/// [Errors] ////

parserComputedPropertyName25.ts(3,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName25.ts(3,6): error TS2304: Cannot find name 'e'.
parserComputedPropertyName25.ts(3,6): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserComputedPropertyName25.ts(3,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName25.ts(4,6): error TS2304: Cannot find name 'e2'.


==== parserComputedPropertyName25.ts (5 errors) ====
    class C {
        // No ASI
        [e] = 0
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'e'.
         ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
              ~
        [e2] = 1
    ~~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
         ~~
!!! error TS2304: Cannot find name 'e2'.
    }