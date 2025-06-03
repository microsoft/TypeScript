//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeOverride1.ts] ////

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
/// <reference types="pkg" />
foo;
bar; // bar should resolve while foo should not, since index.js is cjs
export {};

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg" />
foo;
bar; // bar should resolve while foo should not, since index.js is cjs
