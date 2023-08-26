//// [tests/cases/conformance/node/nodeModulesImportAttributesTypeModeDeclarationEmit.ts] ////

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
export interface ImportInterface {}
//// [require.d.ts]
export interface RequireInterface {}
//// [index.ts]
export type LocalInterface =
    & import("pkg", { with: {"resolution-mode": "require"} }).RequireInterface
    & import("pkg", { with: {"resolution-mode": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { with: {"resolution-mode": "require"} }).RequireInterface);
export const b = (null as any as import("pkg", { with: {"resolution-mode": "import"} }).ImportInterface);


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = null;
exports.b = null;


//// [index.d.ts]
export type LocalInterface = import("pkg", { with: { "resolution-mode": "require" } }).RequireInterface & import("pkg", { with: { "resolution-mode": "import" } }).ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: import("pkg", { with: { "resolution-mode": "import" } }).ImportInterface;
