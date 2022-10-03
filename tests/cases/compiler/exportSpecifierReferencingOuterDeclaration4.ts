// @module: commonjs
// @Filename: exportSpecifierReferencingOuterDeclaration2_A.ts
declare module X { export interface bar { } }

// @Filename: exportSpecifierReferencingOuterDeclaration2_B.ts
declare module X { export interface foo { } }
export { X };
export declare function foo(): X.foo;
export declare function bar(): X.bar; // error