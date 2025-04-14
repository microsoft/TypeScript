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
    & import("pkg", { with: {"resolution-mode": "foobar"} }).RequireInterface
    & import("pkg", { with: {"resolution-mode": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { with: {"resolution-mode": "foobar"} }).RequireInterface);
export const b = (null as any as import("pkg", { with: {"resolution-mode": "import"} }).ImportInterface);

// @filename: /other.ts
// missing with:
export type LocalInterface =
    & import("pkg", {"resolution-mode": "require"}).RequireInterface
    & import("pkg", {"resolution-mode": "import"}).ImportInterface;

export const a = (null as any as import("pkg", {"resolution-mode": "require"}).RequireInterface);
export const b = (null as any as import("pkg", {"resolution-mode": "import"}).ImportInterface);

// @filename: /other2.ts
// wrong attribute key
export type LocalInterface =
    & import("pkg", { with: {"bad": "require"} }).RequireInterface
    & import("pkg", { with: {"bad": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { with: {"bad": "require"} }).RequireInterface);
export const b = (null as any as import("pkg", { with: {"bad": "import"} }).ImportInterface);

// @filename: /other3.ts
// Array instead of object-y thing
export type LocalInterface =
    & import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface
    & import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface;

export const a = (null as any as import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface);
export const b = (null as any as import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface);

// @filename: /other4.ts
// Indirected attribute objecty-thing - not allowed
type Attribute1 = { with: {"resolution-mode": "require"} };
type Attribute2 = { with: {"resolution-mode": "import"} };

export type LocalInterface =
    & import("pkg", Attribute1).RequireInterface
    & import("pkg", Attribute2).ImportInterface;

export const a = (null as any as import("pkg", Attribute1).RequireInterface);
export const b = (null as any as import("pkg", Attribute2).ImportInterface);

// @filename: /other5.ts
export type LocalInterface =
    & import("pkg", { with: {} }).RequireInterface
    & import("pkg", { with: {} }).ImportInterface;

export const a = (null as any as import("pkg", { with: {} }).RequireInterface);
export const b = (null as any as import("pkg", { with: {} }).ImportInterface);