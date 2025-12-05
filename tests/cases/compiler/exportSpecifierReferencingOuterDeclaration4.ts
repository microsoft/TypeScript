// @module: commonjs
// @Filename: exportSpecifierReferencingOuterDeclaration2_A.ts
declare namespace X { export interface bar { } }

// @Filename: exportSpecifierReferencingOuterDeclaration2_B.ts
declare namespace X { export interface foo { } }
export { X };
export declare function foo(): X.foo;
export declare function bar(): X.bar; // error