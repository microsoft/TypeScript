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
import { type ImportInterface } from "pkg" assert { "resolution-mode": "import" };
export declare type LocalInterface = import("pkg", { assert: { "resolution-mode": "require" } }).RequireInterface & ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: ImportInterface;


//// [DtsFileErrors]


out/index.d.ts(1,15): error TS2305: Module '"pkg"' has no exported member 'ImportInterface'.
out/index.d.ts(1,44): error TS2836: Import assertions are not allowed on statements that transpile to commonjs 'require' calls.


==== out/index.d.ts (2 errors) ====
    import { type ImportInterface } from "pkg" assert { "resolution-mode": "import" };
                  ~~~~~~~~~~~~~~~
!!! error TS2305: Module '"pkg"' has no exported member 'ImportInterface'.
                                               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2836: Import assertions are not allowed on statements that transpile to commonjs 'require' calls.
    export declare type LocalInterface = import("pkg", { assert: { "resolution-mode": "require" } }).RequireInterface & ImportInterface;
    export declare const a: import("pkg").RequireInterface;
    export declare const b: ImportInterface;
    
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