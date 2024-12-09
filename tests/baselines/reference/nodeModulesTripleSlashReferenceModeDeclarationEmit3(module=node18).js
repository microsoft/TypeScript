//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit3.ts] ////

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
//// [package.json]
{
    "private": true,
    "type": "module"
}
//// [index.ts]
/// <reference types="pkg" resolution-mode="require" preserve="true" />
export interface LocalInterface extends RequireInterface {}

//// [index.js]
/// <reference types="pkg" resolution-mode="require" preserve="true" />
export {};


//// [index.d.ts]
/// <reference types="pkg" resolution-mode="require" preserve="true" />
export interface LocalInterface extends RequireInterface {
}
