//// [tests/cases/compiler/exportSpecifierReferencingOuterDeclaration1.ts] ////

//// [exportSpecifierReferencingOuterDeclaration1.ts]
declare namespace X { export interface bar { } }
declare module "m" {
    export { X };
    export function foo(): X.bar;
}

//// [exportSpecifierReferencingOuterDeclaration1.js]
