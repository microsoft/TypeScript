//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName29.ts] ////

//// [parserComputedPropertyName29.ts]
class C {
    // yes ASI
    [e] = id++
    [e2]: number
}

/// [Declarations] ////



//// [parserComputedPropertyName29.d.ts]
declare class C {
    [e]: invalid;
    [e2]: number;
}
/// [Errors] ////

parserComputedPropertyName29.ts(3,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName29.ts(3,6): error TS2304: Cannot find name 'e'.
parserComputedPropertyName29.ts(3,6): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserComputedPropertyName29.ts(3,11): error TS2304: Cannot find name 'id'.
parserComputedPropertyName29.ts(3,11): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName29.ts(4,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName29.ts(4,6): error TS2304: Cannot find name 'e2'.
parserComputedPropertyName29.ts(4,6): error TS4031: Public property '[e2]' of exported class has or is using private name 'e2'.


==== parserComputedPropertyName29.ts (8 errors) ====
    class C {
        // yes ASI
        [e] = id++
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'e'.
         ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
              ~~
!!! error TS2304: Cannot find name 'id'.
              ~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        [e2]: number
        ~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
         ~~
!!! error TS2304: Cannot find name 'e2'.
         ~~
!!! error TS4031: Public property '[e2]' of exported class has or is using private name 'e2'.
    }