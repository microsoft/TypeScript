//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName28.ts] ////

//// [parserComputedPropertyName28.ts]
class C {
    [e]: number = 0;
    [e2]: number
}

/// [Declarations] ////



//// [parserComputedPropertyName28.d.ts]
declare class C {
    [e]: number;
    [e2]: number;
}

/// [Errors] ////

parserComputedPropertyName28.ts(2,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName28.ts(2,6): error TS2304: Cannot find name 'e'.
parserComputedPropertyName28.ts(2,6): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
parserComputedPropertyName28.ts(3,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName28.ts(3,6): error TS2304: Cannot find name 'e2'.
parserComputedPropertyName28.ts(3,6): error TS4031: Public property '[e2]' of exported class has or is using private name 'e2'.


==== parserComputedPropertyName28.ts (6 errors) ====
    class C {
        [e]: number = 0;
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'e'.
         ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
        [e2]: number
        ~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
         ~~
!!! error TS2304: Cannot find name 'e2'.
         ~~
!!! error TS4031: Public property '[e2]' of exported class has or is using private name 'e2'.
    }