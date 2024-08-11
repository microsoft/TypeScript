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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = null;
exports.b = null;
//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
"resolution-mode";
"require";
RequireInterface
    & import("pkg", { "resolution-mode": "import" }).ImportInterface;
exports.a = null;
"resolution-mode";
"require";
RequireInterface;
;
exports.b = null;
"resolution-mode";
"import";
ImportInterface;
;
//// [other2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = null;
exports.b = null;
//// [other3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
RequireInterface
    & import("pkg", [{ "resolution-mode": "import" }]).ImportInterface;
exports.a = null.RequireInterface;
exports.b = null.ImportInterface;
//// [other4.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportInterface = exports.Attribute2 = exports.b = exports.RequireInterface = exports.Attribute1 = exports.a = void 0;
exports.Attribute1;
exports.RequireInterface
    & import("pkg", exports.Attribute2).ImportInterface;
exports.a = null;
exports.b = null;
//// [other5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = null;
exports.b = null;


//// [index.d.ts]
export type LocalInterface = import("pkg", { with: { "resolution-mode": "foobar" } }).RequireInterface & import("pkg", { with: { "resolution-mode": "import" } }).ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: import("pkg", { with: { "resolution-mode": "import" } }).ImportInterface;
//// [other.d.ts]
export type LocalInterface = import("pkg", { with: {} });
export declare const a: any;
export declare const b: any;
//// [other2.d.ts]
export type LocalInterface = import("pkg", { with: { "bad": "require" } }).RequireInterface & import("pkg", { with: { "bad": "import" } }).ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: any;
//// [other3.d.ts]
export type LocalInterface = import("pkg", { with: {} })[{
    "resolution-mode": "require";
}];
export declare const a: any;
export declare const b: any;
//// [other4.d.ts]
export type LocalInterface = import("pkg", { with: {} });
export declare const a: any, Attribute1: any, RequireInterface: any;
export declare const b: any, Attribute2: any, ImportInterface: any;
//// [other5.d.ts]
export type LocalInterface = import("pkg", { with: {} }).RequireInterface & import("pkg", { with: {} }).ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: any;
