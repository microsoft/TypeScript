//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName22.ts] ////

//// [parserComputedPropertyName22.ts]
declare class C {
    [e]: number 
}

/// [Declarations] ////



//// [parserComputedPropertyName22.d.ts]
declare class C {
    [e]: number;
}

/// [Errors] ////

parserComputedPropertyName22.ts(2,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName22.ts(2,6): error TS2304: Cannot find name 'e'.
parserComputedPropertyName22.ts(2,6): error TS4031: Public property '[e]' of exported class has or is using private name 'e'.


==== parserComputedPropertyName22.ts (3 errors) ====
    declare class C {
        [e]: number 
        ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'e'.
         ~
!!! error TS4031: Public property '[e]' of exported class has or is using private name 'e'.
    }