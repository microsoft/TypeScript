//// [tests/cases/conformance/parser/ecmascript6/ComputedPropertyNames/parserComputedPropertyName39.ts] ////

//// [parserComputedPropertyName39.ts]
"use strict";
class C {
    [public]() { }
}

/// [Declarations] ////



//// [parserComputedPropertyName39.d.ts]
declare class C {
    [public](): invalid;
}

/// [Errors] ////

parserComputedPropertyName39.ts(3,5): error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
parserComputedPropertyName39.ts(3,6): error TS1213: Identifier expected. 'public' is a reserved word in strict mode. Class definitions are automatically in strict mode.
parserComputedPropertyName39.ts(3,6): error TS2304: Cannot find name 'public'.


==== parserComputedPropertyName39.ts (3 errors) ====
    "use strict";
    class C {
        [public]() { }
        ~~~~~~~~
!!! error TS9008: Method must have an explicit return type annotation with --isolatedDeclarations.
!!! related TS9034 parserComputedPropertyName39.ts:3:5: Add a return type to the method
         ~~~~~~
!!! error TS1213: Identifier expected. 'public' is a reserved word in strict mode. Class definitions are automatically in strict mode.
         ~~~~~~
!!! error TS2304: Cannot find name 'public'.
    }