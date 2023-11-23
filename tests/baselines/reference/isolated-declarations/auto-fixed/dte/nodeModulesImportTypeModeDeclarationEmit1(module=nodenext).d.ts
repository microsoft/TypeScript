//// [tests/cases/conformance/node/nodeModulesImportTypeModeDeclarationEmit1.ts] ////

//// [/index.ts]
export type LocalInterface =
    & import("pkg", { assert: {"resolution-mode": "require"} }).RequireInterface
    & import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { assert: {"resolution-mode": "require"} }).RequireInterface);
export const b = (null as any as import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface);

//// [/node_modules/pkg/package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "exports": {
        "import": "./import.js",
        "require": "./require.js"
    }
}
//// [/node_modules/pkg/import.d.ts]
export interface ImportInterface {}
//// [/node_modules/pkg/require.d.ts]
export interface RequireInterface {}

/// [Declarations] ////



//// [/.src/out/index.d.ts]
export type LocalInterface = import("pkg", { assert: { "resolution-mode": "require" } }).RequireInterface & import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;
export declare const a: import("pkg", { assert: { "resolution-mode": "require" } }).RequireInterface;
export declare const b: import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;
//# sourceMappingURL=index.d.ts.map