// @noImplicitReferences: true
// @module: commonjs
// @outDir: out
// @filename: /node_modules/pkg/package.json
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
// @filename: /node_modules/pkg/import.d.ts
export {};
declare global {
    var foo: number;
}
// @filename: /node_modules/pkg/require.d.ts
export {};
declare global {
    var bar: number;
}
// @filename: /index.ts
/// <reference types="pkg" resolution-mode="require" />
/// <reference types="pkg" resolution-mode="import" />
foo;
bar;
export {};