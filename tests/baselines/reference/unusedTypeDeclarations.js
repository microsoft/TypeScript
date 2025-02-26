//// [tests/cases/compiler/unusedTypeDeclarations.ts] ////

//// [unusedTypeDeclarations.ts]
type T1 = number;  // error
type _T2 = number; // ok

export {};


//// [unusedTypeDeclarations.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
