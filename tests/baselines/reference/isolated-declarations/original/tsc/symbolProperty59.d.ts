//// [tests/cases/conformance/es6/Symbols/symbolProperty59.ts] ////

//// [symbolProperty59.ts]
interface I {
    [Symbol.keyFor]: string;
}

/// [Declarations] ////



//// [symbolProperty59.d.ts]
interface I {
}
/// [Errors] ////

symbolProperty59.ts(2,5): error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
symbolProperty59.ts(2,5): error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.


==== symbolProperty59.ts (2 errors) ====
    interface I {
        [Symbol.keyFor]: string;
        ~~~~~~~~~~~~~~~
!!! error TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
        ~~~~~~~~~~~~~~~
!!! error TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
    }