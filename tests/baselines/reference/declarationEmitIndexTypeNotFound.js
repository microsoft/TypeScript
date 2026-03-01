//// [tests/cases/compiler/declarationEmitIndexTypeNotFound.ts] ////

//// [declarationEmitIndexTypeNotFound.ts]
export interface Test {
    [index: TypeNotFound]: any;
}


//// [declarationEmitIndexTypeNotFound.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [declarationEmitIndexTypeNotFound.d.ts]
export interface Test {
    [index: TypeNotFound]: any;
}
