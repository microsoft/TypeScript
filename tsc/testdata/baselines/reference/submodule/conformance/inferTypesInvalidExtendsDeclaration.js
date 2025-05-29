//// [tests/cases/conformance/types/conditional/inferTypesInvalidExtendsDeclaration.ts] ////

//// [inferTypesInvalidExtendsDeclaration.ts]
type Test<T> = T extends infer A extends B ? number : string;


//// [inferTypesInvalidExtendsDeclaration.js]


//// [inferTypesInvalidExtendsDeclaration.d.ts]
type Test<T> = T extends infer A extends B ? number : string;
