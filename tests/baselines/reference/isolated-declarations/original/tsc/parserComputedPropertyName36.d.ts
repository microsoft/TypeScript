//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName36.ts] ////

//// [parserComputedPropertyName36.ts]
class C {
    [public ]: string;
}

/// [Declarations] ////



//// [/.src/parserComputedPropertyName36.d.ts]
declare class C {
    [public]: string;
}
/// [Errors] ////

parserComputedPropertyName36.ts(2,5): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName36.ts(2,5): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
parserComputedPropertyName36.ts(2,6): error TS1213: Identifier expected. 'public' is a reserved word in strict mode. Class definitions are automatically in strict mode.
parserComputedPropertyName36.ts(2,6): error TS2304: Cannot find name 'public'.
parserComputedPropertyName36.ts(2,6): error TS4031: Public property '[public ]' of exported class has or is using private name 'public'.


==== parserComputedPropertyName36.ts (5 errors) ====
    class C {
        [public ]: string;
        ~~~~~~~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
        ~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
         ~~~~~~
!!! error TS1213: Identifier expected. 'public' is a reserved word in strict mode. Class definitions are automatically in strict mode.
         ~~~~~~
!!! error TS2304: Cannot find name 'public'.
         ~~~~~~
!!! error TS4031: Public property '[public ]' of exported class has or is using private name 'public'.
    }