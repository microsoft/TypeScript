//// [tests/cases/compiler/noCheckRequiresEmitDeclarationOnly.ts] ////

//// [noCheckRequiresEmitDeclarationOnly.ts]
export const a: number = "not ok";


//// [noCheckRequiresEmitDeclarationOnly.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "not ok";
