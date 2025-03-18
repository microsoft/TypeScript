//// [tests/cases/conformance/node/nodeModulesImportAttributesTypeModeDeclarationEmitErrors.ts] ////

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
    & import("pkg", { with: {"resolution-mode": "foobar"} }).RequireInterface
    & import("pkg", { with: {"resolution-mode": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { with: {"resolution-mode": "foobar"} }).RequireInterface);
export const b = (null as any as import("pkg", { with: {"resolution-mode": "import"} }).ImportInterface);

//// [other.ts]
// missing with:
export type LocalInterface =
    & import("pkg", {"resolution-mode": "require"}).RequireInterface
    & import("pkg", {"resolution-mode": "import"}).ImportInterface;

export const a = (null as any as import("pkg", {"resolution-mode": "require"}).RequireInterface);
export const b = (null as any as import("pkg", {"resolution-mode": "import"}).ImportInterface);

//// [other2.ts]
// wrong attribute key
export type LocalInterface =
    & import("pkg", { with: {"bad": "require"} }).RequireInterface
    & import("pkg", { with: {"bad": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { with: {"bad": "require"} }).RequireInterface);
export const b = (null as any as import("pkg", { with: {"bad": "import"} }).ImportInterface);

//// [other3.ts]
// Array instead of object-y thing
export type LocalInterface =
    & import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface
    & import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface;

export const a = (null as any as import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface);
export const b = (null as any as import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface);

//// [other4.ts]
// Indirected attribute objecty-thing - not allowed
type Attribute1 = { with: {"resolution-mode": "require"} };
type Attribute2 = { with: {"resolution-mode": "import"} };

export type LocalInterface =
    & import("pkg", Attribute1).RequireInterface
    & import("pkg", Attribute2).ImportInterface;

export const a = (null as any as import("pkg", Attribute1).RequireInterface);
export const b = (null as any as import("pkg", Attribute2).ImportInterface);

//// [other5.ts]
export type LocalInterface =
    & import("pkg", { with: {} }).RequireInterface
    & import("pkg", { with: {} }).ImportInterface;

export const a = (null as any as import("pkg", { with: {} }).RequireInterface);
export const b = (null as any as import("pkg", { with: {} }).ImportInterface);

//// [index.js]
export const a = null;
export const b = null;
//// [other.js]
"resolution-mode";
"require";
RequireInterface
    & import("pkg", { "resolution-mode": "import" }).ImportInterface;
export const a = null;
"resolution-mode";
"require";
RequireInterface;
;
export const b = null;
"resolution-mode";
"import";
ImportInterface;
;
//// [other2.js]
export const a = null;
export const b = null;
//// [other3.js]
RequireInterface
    & import("pkg", [{ "resolution-mode": "import" }]).ImportInterface;
export const a = null.RequireInterface;
export const b = null.ImportInterface;
//// [other4.js]
Attribute1;
RequireInterface
    & import("pkg", Attribute2).ImportInterface;
export const a = null, Attribute1, RequireInterface;
export const b = null, Attribute2, ImportInterface;
//// [other5.js]
export const a = null;
export const b = null;
