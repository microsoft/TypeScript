//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName12.ts] ////

//// [parserComputedPropertyName12.ts]
class C {
   [e]() { }
}

/// [Declarations] ////



//// [parserComputedPropertyName12.d.ts]
declare class C {
    [e](): invalid;
}

/// [Errors] ////

parserComputedPropertyName12.ts(2,4): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
parserComputedPropertyName12.ts(2,5): error TS2304: Cannot find name 'e'.


==== parserComputedPropertyName12.ts (2 errors) ====
    class C {
       [e]() { }
       ~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 parserComputedPropertyName12.ts:2:4: Add a return type to the method
        ~
!!! error TS2304: Cannot find name 'e'.
    }