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

//// [index.mjs]
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
//// [index.cjs]
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
//// [index.js]
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
