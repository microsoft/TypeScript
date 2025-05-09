//// [tests/cases/conformance/node/allowJs/nodeModulesAllowJsPackagePatternExports.ts] ////

//// [index.js]
// esm format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.mjs]
// esm format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.cjs]
// cjs format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.d.ts]
// cjs format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
export { cjs };
export { mjs };
export { type };
//// [index.d.mts]
// esm format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
export { cjs };
export { mjs };
export { type };
//// [index.d.cts]
// cjs format file
import * as cjs from "inner/cjs/index";
import * as mjs from "inner/mjs/index";
import * as type from "inner/js/index";
export { cjs };
export { mjs };
export { type };
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "exports": {
        "./cjs/*": "./*.cjs",
        "./mjs/*": "./*.mjs",
        "./js/*": "./*.js"
    }
}

//// [index.js]
// esm format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.mjs]
// esm format file
import * as cjsi from "inner/cjs/index";
import * as mjsi from "inner/mjs/index";
import * as typei from "inner/js/index";
cjsi;
mjsi;
typei;
//// [index.cjs]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// cjs format file
const cjsi = __importStar(require("inner/cjs/index"));
const mjsi = __importStar(require("inner/mjs/index"));
const typei = __importStar(require("inner/js/index"));
cjsi;
mjsi;
typei;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
