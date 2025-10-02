//// [tests/cases/conformance/node/nodeModulesDeclarationEmitWithPackageExports.ts] ////

//// [index.ts]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
export const a = cjs;
export const b = mjs;
export const c = type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
export const d = cjsi;
export const e = mjsi;
export const f = typei;
//// [index.mts]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
export const a = cjs;
export const b = mjs;
export const c = type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
export const d = cjsi;
export const e = mjsi;
export const f = typei;
//// [index.cts]
// cjs format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
export const a = cjs;
export const b = mjs;
export const c = type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
export const d = cjsi;
export const e = mjsi;
export const f = typei;
//// [index.d.ts]
// cjs format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
cjs;
mjs;
type;
export const cjsMain = true;
//// [index.d.mts]
// esm format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
cjs;
mjs;
type;
export const esm = true;
//// [index.d.cts]
// cjs format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
cjs;
mjs;
type;
export const cjsNonmain = true;
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}

//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = exports.e = exports.d = exports.c = exports.b = exports.a = void 0;
// esm format file
const cjs = require("package/cjs");
const mjs = require("package/mjs");
const type = require("package");
exports.a = cjs;
exports.b = mjs;
exports.c = type;
const cjsi = require("inner/cjs");
const mjsi = require("inner/mjs");
const typei = require("inner");
exports.d = cjsi;
exports.e = mjsi;
exports.f = typei;
//// [index.mjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = exports.e = exports.d = exports.c = exports.b = exports.a = void 0;
// esm format file
const cjs = require("package/cjs");
const mjs = require("package/mjs");
const type = require("package");
exports.a = cjs;
exports.b = mjs;
exports.c = type;
const cjsi = require("inner/cjs");
const mjsi = require("inner/mjs");
const typei = require("inner");
exports.d = cjsi;
exports.e = mjsi;
exports.f = typei;
//// [index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = exports.e = exports.d = exports.c = exports.b = exports.a = void 0;
// cjs format file
const cjs = require("package/cjs");
const mjs = require("package/mjs");
const type = require("package");
exports.a = cjs;
exports.b = mjs;
exports.c = type;
const cjsi = require("inner/cjs");
const mjsi = require("inner/mjs");
const typei = require("inner");
exports.d = cjsi;
exports.e = mjsi;
exports.f = typei;


//// [index.d.ts]
export declare const a: any;
export declare const b: any;
export declare const c: any;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
export declare const d: typeof cjsi;
export declare const e: typeof mjsi;
export declare const f: typeof typei;
//// [index.d.mts]
export declare const a: any;
export declare const b: any;
export declare const c: any;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
export declare const d: typeof cjsi;
export declare const e: typeof mjsi;
export declare const f: typeof typei;
//// [index.d.cts]
export declare const a: any;
export declare const b: any;
export declare const c: any;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
export declare const d: typeof cjsi;
export declare const e: typeof mjsi;
export declare const f: typeof typei;
