//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeDeclarationEmit2.ts] ////

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
/// <reference types="pkg" preserve="true" />
export interface LocalInterface extends ImportInterface {}

//// [index.js]
/// <reference types="pkg" preserve="true" />
export {};


//// [index.d.ts]
/// <reference types="pkg" preserve="true" />
export interface LocalInterface extends ImportInterface {
}
