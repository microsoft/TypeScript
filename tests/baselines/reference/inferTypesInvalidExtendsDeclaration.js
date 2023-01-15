//// [inferTypesInvalidExtendsDeclaration.ts]
type Test<T> = T extends infer A extends B ? number : string;


//// [inferTypesInvalidExtendsDeclaration.js]
