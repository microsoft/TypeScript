//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName21.ts] ////

//// [parserComputedPropertyName21.ts]
interface I {
    [e]: number 
}

/// [Declarations] ////



//// [parserComputedPropertyName21.d.ts]
interface I {
}
/// [Errors] ////

parserComputedPropertyName21.ts(2,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserComputedPropertyName21.ts(2,6): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName21.ts (2 errors) ====
    interface I {
        [e]: number 
        ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'e'.
    }