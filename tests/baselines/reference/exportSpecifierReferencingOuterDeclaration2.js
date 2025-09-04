//// [tests/cases/compiler/exportSpecifierReferencingOuterDeclaration2.ts] ////

//// [exportSpecifierReferencingOuterDeclaration2_A.ts]
declare namespace X { export interface bar { } }

//// [exportSpecifierReferencingOuterDeclaration2_B.ts]
export { X };
export declare function foo(): X.bar;

//// [exportSpecifierReferencingOuterDeclaration2_A.js]
//// [exportSpecifierReferencingOuterDeclaration2_B.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
