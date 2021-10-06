//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsPackageExports.ts] ////

//// [index.js]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.mjs]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.cjs]
// cjs format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.d.ts]
// cjs format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
export { cjs };
export { mjs };
export { type };
//// [index.d.mts]
// esm format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
export { cjs };
export { mjs };
export { type };
//// [index.d.cts]
// cjs format file
import * as cjs from "inner/cjs";
import * as mjs from "inner/mjs";
import * as type from "inner";
export { cjs };
export { mjs };
export { type };
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
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.mjs]
// esm format file
import * as cjs from "package/cjs";
import * as mjs from "package/mjs";
import * as type from "package";
cjs;
mjs;
type;
import * as cjsi from "inner/cjs";
import * as mjsi from "inner/mjs";
import * as typei from "inner";
cjsi;
mjsi;
typei;
//// [index.cjs]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const cjs = __importStar(require("package/cjs"));
const mjs = __importStar(require("package/mjs"));
const type = __importStar(require("package"));
cjs;
mjs;
type;
const cjsi = __importStar(require("inner/cjs"));
const mjsi = __importStar(require("inner/mjs"));
const typei = __importStar(require("inner"));
cjsi;
mjsi;
typei;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
