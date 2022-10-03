// @module: commonjs
// @Filename: exportSpecifierReferencingOuterDeclaration2_A.ts
declare module X { export interface bar { } }

// @Filename: exportSpecifierReferencingOuterDeclaration2_B.ts
export { X };
export declare function foo(): X.bar;