//// [tests/cases/compiler/exportSpecifierReferencingOuterDeclaration4.ts] ////

//// [exportSpecifierReferencingOuterDeclaration2_A.ts]
declare module X { export interface bar { } }

//// [exportSpecifierReferencingOuterDeclaration2_B.ts]
declare module X { export interface foo { } }
export { X };
export declare function foo(): X.foo;
export declare function bar(): X.bar; // error

//// [exportSpecifierReferencingOuterDeclaration2_A.js]
//// [exportSpecifierReferencingOuterDeclaration2_B.js]
"use strict";
exports.__esModule = true;
