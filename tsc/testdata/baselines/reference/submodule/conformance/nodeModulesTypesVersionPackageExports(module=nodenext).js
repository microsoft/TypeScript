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
const mod = __importStar(require("inner"));
mod.correctVersionApplied;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
