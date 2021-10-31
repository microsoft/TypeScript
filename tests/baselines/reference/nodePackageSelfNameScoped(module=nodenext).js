//// [tests/cases/conformance/node/nodePackageSelfNameScoped.ts] ////

//// [index.ts]
// esm format file
import * as self from "@scope/package";
self;
//// [index.mts]
// esm format file
import * as self from "@scope/package";
self;
//// [index.cts]
// cjs format file
import * as self from "@scope/package";
self;
//// [package.json]
{
    "name": "@scope/package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}

//// [index.js]
// esm format file
import * as self from "@scope/package";
self;
//// [index.mjs]
// esm format file
import * as self from "@scope/package";
self;
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
const self = __importStar(require("@scope/package"));
self;


//// [index.d.ts]
export {};
//// [index.d.mts]
export {};
//// [index.d.cts]
export {};
