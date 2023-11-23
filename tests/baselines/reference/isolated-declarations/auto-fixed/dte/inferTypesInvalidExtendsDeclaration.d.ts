//// [tests/cases/conformance/types/conditional/inferTypesInvalidExtendsDeclaration.ts] ////

//// [inferTypesInvalidExtendsDeclaration.ts]
type Test<T> = T extends infer A extends B ? number : string;


/// [Declarations] ////



//// [inferTypesInvalidExtendsDeclaration.d.ts]
type Test<T> = T extends infer A extends B ? number : string;
//# sourceMappingURL=inferTypesInvalidExtendsDeclaration.d.ts.map
/// [Errors] ////

inferTypesInvalidExtendsDeclaration.ts(1,42): error TS2304: Cannot find name 'B'.
inferTypesInvalidExtendsDeclaration.ts(1,42): error TS4085: Extends clause for inferred type 'A' has or is using private name 'B'.


==== inferTypesInvalidExtendsDeclaration.ts (2 errors) ====
    type Test<T> = T extends infer A extends B ? number : string;
                                             ~
!!! error TS2304: Cannot find name 'B'.
                                             ~
!!! error TS4085: Extends clause for inferred type 'A' has or is using private name 'B'.
    