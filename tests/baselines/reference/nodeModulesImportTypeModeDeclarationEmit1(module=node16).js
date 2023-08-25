//// [tests/cases/conformance/node/nodeModulesImportTypeModeDeclarationEmit1.ts] ////

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
    & import("pkg", { assert: {"resolution-mode": "require"} }).RequireInterface
    & import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { assert: {"resolution-mode": "require"} }).RequireInterface);
export const b = (null as any as import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface);


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = null;
exports.b = null;


//// [index.d.ts]
export type LocalInterface = import("pkg", { assert: { "resolution-mode": "require" } }).RequireInterface & import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: import("pkg").ImportInterface;


//// [DtsFileErrors]


out/index.d.ts(3,39): error TS2694: Namespace '"/node_modules/pkg/require"' has no exported member 'ImportInterface'.


==== out/index.d.ts (1 errors) ====
    export type LocalInterface = import("pkg", { assert: { "resolution-mode": "require" } }).RequireInterface & import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;
    export declare const a: import("pkg").RequireInterface;
    export declare const b: import("pkg").ImportInterface;
                                          ~~~~~~~~~~~~~~~
!!! error TS2694: Namespace '"/node_modules/pkg/require"' has no exported member 'ImportInterface'.
    
==== /node_modules/pkg/package.json (0 errors) ====
    {
        "name": "pkg",
        "version": "0.0.1",
        "exports": {
            "import": "./import.js",
            "require": "./require.js"
        }
    }
==== /node_modules/pkg/import.d.ts (0 errors) ====
    export interface ImportInterface {}
==== /node_modules/pkg/require.d.ts (0 errors) ====
    export interface RequireInterface {}