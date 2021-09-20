//// [tests/cases/conformance/node/nodeModulesTypesVersionPackageExports.ts] ////

//// [index.ts]
// esm format file
import * as mod from "inner";
mod.correctVersionApplied;

//// [index.mts]
// esm format file
import * as mod from "inner";
mod.correctVersionApplied;

//// [index.cts]
// cjs format file
import * as mod from "inner";
mod.correctVersionApplied;

//// [index.d.ts]
// cjs format file
export const noConditionsApplied = true;
//// [index.d.mts]
// esm format file
export const importConditionApplied = true;
//// [index.d.cts]
// cjs format file
export const wrongConditionApplied = true;
//// [old-types.d.ts]
export const noVersionApplied = true;
//// [new-types.d.ts]
export const correctVersionApplied = true;
//// [future-types.d.ts]
export const futureVersionApplied = true;
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
        ".": {
            "types@>=10000": "./future-types.d.ts",
            "types@>=1": "./new-types.d.ts",
            "types": "./old-types.d.ts",
            "import": "./index.mjs",
            "node": "./index.js"
        },
    }
}

//// [index.js]
// esm format file
import * as mod from "inner";
mod.correctVersionApplied;
//// [index.mjs]
// esm format file
import * as mod from "inner";
mod.correctVersionApplied;
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
const mod = __importStar(require("inner"));
mod.correctVersionApplied;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
