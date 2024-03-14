//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit1.ts] ////

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
//// [import.d.ts]
export {};
declare global {
    interface ImportInterface {}
}
//// [require.d.ts]
export {};
declare global {
    interface RequireInterface {}
}
//// [index.ts]
/// <reference types="pkg" preserve="true" />
export interface LocalInterface extends RequireInterface {}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg" preserve="true" />


//// [index.d.ts]
/// <reference types="pkg" preserve="true" />
export interface LocalInterface extends RequireInterface {
}
