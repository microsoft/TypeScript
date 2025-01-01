// @noImplicitReferences: true
// @module: node16,node18,nodenext
// @declaration: true
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
    interface ImportInterface {}
}
// @filename: /node_modules/pkg/require.d.ts
export {};
declare global {
    interface RequireInterface {}
}
// @filename: /package.json
{
    "private": true,
    "type": "module"
}
// @filename: /index.ts
/// <reference types="pkg" preserve="true" />
export interface LocalInterface extends ImportInterface {}