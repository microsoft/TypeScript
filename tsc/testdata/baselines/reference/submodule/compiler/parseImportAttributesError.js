//// [tests/cases/compiler/parseImportAttributesError.ts] ////

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
    & import("pkg", { with: {1234, "resolution-mode": "require"} }).RequireInterface
    & import("pkg", { with: {1234, "resolution-mode": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { with: {1234, "resolution-mode": "require"} }).RequireInterface);
export const b = (null as any as import("pkg", { with: {1234, "resolution-mode": "import"} }).ImportInterface);


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
1234, "resolution-mode";
"require";
RequireInterface
    & import("pkg", { with: { 1234: , "resolution-mode": "import" } }).ImportInterface;
exports.a = null;
1234, "resolution-mode";
"require";
RequireInterface;
;
exports.b = null;
1234, "resolution-mode";
"import";
ImportInterface;
;


//// [index.d.ts]
export type LocalInterface = import("pkg", { with: {} });
export declare const a: any;
export declare const b: any;
