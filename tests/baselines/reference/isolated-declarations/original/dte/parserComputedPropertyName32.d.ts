//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName32.ts] ////

//// [parserComputedPropertyName32.ts]
declare class C {
    [e](): number 
}

/// [Declarations] ////



//// [parserComputedPropertyName32.d.ts]
declare class C {
    [e](): number;
}

/// [Errors] ////

parserComputedPropertyName32.ts(2,5): error TS1165: A computed property name in an ambient context must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserComputedPropertyName32.ts(2,6): error TS2304: Cannot find name 'e'.
parserComputedPropertyName32.ts(2,6): error TS4100: Public method '[e]' of exported class has or is using private name 'e'.


==== parserComputedPropertyName32.ts (3 errors) ====
    declare class C {
        [e](): number 
        ~~~
!!! error TS1165: A computed property name in an ambient context must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'e'.
         ~
!!! error TS4100: Public method '[e]' of exported class has or is using private name 'e'.
    }