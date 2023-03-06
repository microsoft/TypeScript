//// [tests/cases/conformance/node/nodeModulesTripleSlashReferenceModeOverride2.ts] ////

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
/// <reference types="pkg" />
foo; // foo should resolve while bar should not, since index.js is esm
bar;
export {};

//// [index.js]
/// <reference types="pkg" />
foo; // foo should resolve while bar should not, since index.js is esm
bar;
export {};
