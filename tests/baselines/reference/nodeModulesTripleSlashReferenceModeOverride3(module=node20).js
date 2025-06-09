//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeOverride3.ts] ////

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
//// [package.json]
{
    "private": true,
    "type": "module"
}
//// [index.ts]
/// <reference types="pkg" resolution-mode="require" />
foo;
bar; // bar should resolve while foo should not, since even though index.js is esm, the reference is cjs
export {};

//// [index.js]
/// <reference types="pkg" resolution-mode="require" />
foo;
bar; // bar should resolve while foo should not, since even though index.js is esm, the reference is cjs
export {};
