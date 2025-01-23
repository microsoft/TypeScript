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
export interface ImportInterface {}
// @filename: /node_modules/pkg/require.d.ts
export interface RequireInterface {}
// @filename: /index.ts
export type LocalInterface =
    & import("pkg", { assert: {"resolution-mode": "foobar"} }).RequireInterface
    & import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { assert: {"resolution-mode": "foobar"} }).RequireInterface);
export const b = (null as any as import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface);
// @filename: /other.ts
// missing assert:
export type LocalInterface =
    & import("pkg", {"resolution-mode": "require"}).RequireInterface
    & import("pkg", {"resolution-mode": "import"}).ImportInterface;

export const a = (null as any as import("pkg", {"resolution-mode": "require"}).RequireInterface);
export const b = (null as any as import("pkg", {"resolution-mode": "import"}).ImportInterface);
// @filename: /other2.ts
// wrong assertion key
export type LocalInterface =
    & import("pkg", { assert: {"bad": "require"} }).RequireInterface
    & import("pkg", { assert: {"bad": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { assert: {"bad": "require"} }).RequireInterface);
export const b = (null as any as import("pkg", { assert: {"bad": "import"} }).ImportInterface);
// @filename: /other3.ts
// Array instead of object-y thing
export type LocalInterface =
    & import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface
    & import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface;

export const a = (null as any as import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface);
export const b = (null as any as import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface);
// @filename: /other4.ts
// Indirected assertion objecty-thing - not allowed
type Asserts1 = { assert: {"resolution-mode": "require"} };
type Asserts2 = { assert: {"resolution-mode": "import"} };

export type LocalInterface =
    & import("pkg", Asserts1).RequireInterface
    & import("pkg", Asserts2).ImportInterface;

export const a = (null as any as import("pkg", Asserts1).RequireInterface);
export const b = (null as any as import("pkg", Asserts2).ImportInterface);
// @filename: /other5.ts
export type LocalInterface =
    & import("pkg", { assert: {} }).RequireInterface
    & import("pkg", { assert: {} }).ImportInterface;

export const a = (null as any as import("pkg", { assert: {} }).RequireInterface);
export const b = (null as any as import("pkg", { assert: {} }).ImportInterface);
