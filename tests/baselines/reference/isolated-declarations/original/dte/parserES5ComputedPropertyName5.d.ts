//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName5.ts] ////

//// [parserES5ComputedPropertyName5.ts]
interface I {
    [e]: number 
}

/// [Declarations] ////



//// [/.src/parserES5ComputedPropertyName5.d.ts]
interface I {
    [e]: number;
}
/// [Errors] ////

parserES5ComputedPropertyName5.ts(2,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserES5ComputedPropertyName5.ts(2,6): error TS2304: Cannot find name 'e'.


==== parserES5ComputedPropertyName5.ts (2 errors) ====
    interface I {
        [e]: number 
        ~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
         ~
!!! error TS2304: Cannot find name 'e'.
    }