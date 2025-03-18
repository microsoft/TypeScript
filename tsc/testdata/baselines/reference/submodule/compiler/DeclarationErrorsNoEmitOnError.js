//// [tests/cases/compiler/DeclarationErrorsNoEmitOnError.ts] ////

//// [DeclarationErrorsNoEmitOnError.ts]
type T = { x : number }
export interface I {
    f: T;   
}

//// [DeclarationErrorsNoEmitOnError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
