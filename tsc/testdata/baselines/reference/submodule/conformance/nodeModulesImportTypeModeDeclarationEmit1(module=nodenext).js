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
export const a = null;
export const b = null;
