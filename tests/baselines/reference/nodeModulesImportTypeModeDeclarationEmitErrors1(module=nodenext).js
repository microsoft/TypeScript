//// [tests/cases/conformance/node/nodeModulesImportTypeModeDeclarationEmitErrors1.ts] ////

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
    & import("pkg", { assert: {"resolution-mode": "foobar"} }).RequireInterface
    & import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { assert: {"resolution-mode": "foobar"} }).RequireInterface);
export const b = (null as any as import("pkg", { assert: {"resolution-mode": "import"} }).ImportInterface);
//// [other.ts]
// missing assert:
export type LocalInterface =
    & import("pkg", {"resolution-mode": "require"}).RequireInterface
    & import("pkg", {"resolution-mode": "import"}).ImportInterface;

export const a = (null as any as import("pkg", {"resolution-mode": "require"}).RequireInterface);
export const b = (null as any as import("pkg", {"resolution-mode": "import"}).ImportInterface);
//// [other2.ts]
// wrong assertion key
export type LocalInterface =
    & import("pkg", { assert: {"bad": "require"} }).RequireInterface
    & import("pkg", { assert: {"bad": "import"} }).ImportInterface;

export const a = (null as any as import("pkg", { assert: {"bad": "require"} }).RequireInterface);
export const b = (null as any as import("pkg", { assert: {"bad": "import"} }).ImportInterface);
//// [other3.ts]
// Array instead of object-y thing
export type LocalInterface =
    & import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface
    & import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface;

export const a = (null as any as import("pkg", [ {"resolution-mode": "require"} ]).RequireInterface);
export const b = (null as any as import("pkg", [ {"resolution-mode": "import"} ]).ImportInterface);
//// [other4.ts]
// Indirected assertion objecty-thing - not allowed
type Asserts1 = { assert: {"resolution-mode": "require"} };
type Asserts2 = { assert: {"resolution-mode": "import"} };

export type LocalInterface =
    & import("pkg", Asserts1).RequireInterface
    & import("pkg", Asserts2).ImportInterface;

export const a = (null as any as import("pkg", Asserts1).RequireInterface);
export const b = (null as any as import("pkg", Asserts2).ImportInterface);
//// [other5.ts]
export type LocalInterface =
    & import("pkg", { assert: {} }).RequireInterface
    & import("pkg", { assert: {} }).ImportInterface;

export const a = (null as any as import("pkg", { assert: {} }).RequireInterface);
export const b = (null as any as import("pkg", { assert: {} }).ImportInterface);


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
exports.ImportInterface = exports.Asserts2 = exports.b = exports.RequireInterface = exports.Asserts1 = exports.a = void 0;
exports.Asserts1;
exports.RequireInterface
    & import("pkg", exports.Asserts2).ImportInterface;
exports.a = null;
exports.b = null;
//// [other5.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = null;
exports.b = null;


//// [index.d.ts]
export type LocalInterface = import("pkg", { assert: { "resolution-mode": "foobar" } }).RequireInterface & import("pkg", { assert: { "resolution-mode": "import" } }).ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: import("pkg", { with: { "resolution-mode": "import" } }).ImportInterface;
//// [other.d.ts]
export type LocalInterface = import("pkg", { with: {} });
export declare const a: import("pkg", { with: {} });
export declare const b: import("pkg", { with: {} });
//// [other2.d.ts]
export type LocalInterface = import("pkg", { assert: { "bad": "require" } }).RequireInterface & import("pkg", { assert: { "bad": "import" } }).ImportInterface;
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
export declare const a: import("pkg", { with: {} }), Asserts1: any, RequireInterface: any;
export declare const b: import("pkg", { with: {} }), Asserts2: any, ImportInterface: any;
//// [other5.d.ts]
export type LocalInterface = import("pkg", { assert: {} }).RequireInterface & import("pkg", { assert: {} }).ImportInterface;
export declare const a: import("pkg").RequireInterface;
export declare const b: any;
