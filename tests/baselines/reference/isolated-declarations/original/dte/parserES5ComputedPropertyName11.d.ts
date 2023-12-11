//// [tests/cases/conformance/parser/ecmascript5/ComputedPropertyNames/parserES5ComputedPropertyName11.ts] ////

//// [parserES5ComputedPropertyName11.ts]
class C {
   [e]();
}

/// [Declarations] ////



//// [parserES5ComputedPropertyName11.d.ts]
declare class C {
    [e](): invalid;
}

/// [Errors] ////

parserES5ComputedPropertyName11.ts(2,4): error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
parserES5ComputedPropertyName11.ts(2,4): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
parserES5ComputedPropertyName11.ts(2,5): error TS2304: Cannot find name 'e'.


==== parserES5ComputedPropertyName11.ts (3 errors) ====
    class C {
       [e]();
       ~~~
!!! error TS1168: A computed property name in a method overload must refer to an expression whose type is a literal type or a 'unique symbol' type.
       ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 parserES5ComputedPropertyName11.ts:2:4: Add a return type to the method
        ~
!!! error TS2304: Cannot find name 'e'.
    }