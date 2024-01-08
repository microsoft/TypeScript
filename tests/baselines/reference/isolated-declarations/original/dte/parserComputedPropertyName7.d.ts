//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName7.ts] ////

//// [parserComputedPropertyName7.ts]
class C {
   [e]
}

/// [Declarations] ////



//// [parserComputedPropertyName7.d.ts]
declare class C {
    [e]: invalid;
}

/// [Errors] ////

parserComputedPropertyName7.ts(2,4): error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
parserComputedPropertyName7.ts(2,4): error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
parserComputedPropertyName7.ts(2,5): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName7.ts (3 errors) ====
    class C {
       [e]
       ~~~
!!! error TS1166: A computed property name in a class property declaration must have a simple literal type or a 'unique symbol' type.
       ~~~
!!! error TS9012: Property must have an explicit type annotation with --isolatedDeclarations.
!!! related TS9029 parserComputedPropertyName7.ts:2:4: Add a type annotation to the property [e].
        ~
!!! error TS2304: Cannot find name 'e'.
    }