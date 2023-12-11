//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName38.ts] ////

//// [parserComputedPropertyName38.ts]
class C {
    [public]() { }
}

/// [Declarations] ////



//// [parserComputedPropertyName38.d.ts]
declare class C {
    [public](): invalid;
}

/// [Errors] ////

parserComputedPropertyName38.ts(2,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
parserComputedPropertyName38.ts(2,6): error TS1213: Identifier expected. 'public' is a reserved word in strict mode. Class definitions are automatically in strict mode.
parserComputedPropertyName38.ts(2,6): error TS2304: Cannot find name 'public'.
parserComputedPropertyName38.ts(2,6): error TS4100: Public method '[public]' of exported class has or is using private name 'public'.


==== parserComputedPropertyName38.ts (4 errors) ====
    class C {
        [public]() { }
        ~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations
!!! related TS9034 parserComputedPropertyName38.ts:2:5: Add a return type to the method
         ~~~~~~
!!! error TS1213: Identifier expected. 'public' is a reserved word in strict mode. Class definitions are automatically in strict mode.
         ~~~~~~
!!! error TS2304: Cannot find name 'public'.
         ~~~~~~
!!! error TS4100: Public method '[public]' of exported class has or is using private name 'public'.
    }