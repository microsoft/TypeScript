//// [tests/cases/compiler/exportSpecifierReferencingOuterDeclaration4.ts] ////

//// [exportSpecifierReferencingOuterDeclaration2_A.ts]
declare namespace X { export interface bar { } }

//// [exportSpecifierReferencingOuterDeclaration2_B.ts]
declare namespace X { export interface foo { } }
export { X };
export declare function foo(): X.foo;
export declare function bar(): X.bar; // error

//// [exportSpecifierReferencingOuterDeclaration2_A.js]
//// [exportSpecifierReferencingOuterDeclaration2_B.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
