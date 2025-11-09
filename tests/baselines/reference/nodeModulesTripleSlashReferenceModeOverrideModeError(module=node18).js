//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeOverrideModeError.ts] ////

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
    var foo: number;
}
//// [require.d.ts]
export {};
declare global {
    var bar: number;
}
//// [index.ts]
/// <reference types="pkg" resolution-mode="esm"/>
foo; // bad resolution mode, which resolves is arbitrary
bar;
export {};

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg" resolution-mode="esm"/>
foo; // bad resolution mode, which resolves is arbitrary
bar;
