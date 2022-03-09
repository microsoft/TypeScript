// @module: node12,nodenext
// @declaration: true
// @outDir: out
// @filename: index.ts
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
// @filename: index.mts
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
// @filename: index.cts
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
// @filename: node_modules/inner/index.d.ts
// cjs format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
cjs;
mjs;
type;
export const cjsMain = true;
// @filename: node_modules/inner/index.d.mts
// esm format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
cjs;
mjs;
type;
export const esm = true;
// @filename: node_modules/inner/index.d.cts
// cjs format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
cjs;
mjs;
type;
export const cjsNonmain = true;
// @filename: package.json
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
// @filename: node_modules/inner/package.json
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs": "./index.cjs",
        "./mjs": "./index.mjs",
        ".": "./index.js"
    }
}