//// [tests/cases/compiler/exportSpecifierReferencingOuterDeclaration2.ts] ////

//// [exportSpecifierReferencingOuterDeclaration2_A.ts]
declare module X { export interface bar { } }

//// [exportSpecifierReferencingOuterDeclaration2_B.ts]
export { X };
export declare function foo(): X.bar;

//// [exportSpecifierReferencingOuterDeclaration2_A.js]
//// [exportSpecifierReferencingOuterDeclaration2_B.js]
"use strict";
exports.__esModule = true;
