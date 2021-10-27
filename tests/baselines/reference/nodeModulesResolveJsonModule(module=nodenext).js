//// [tests/cases/conformance/node/nodeModulesResolveJsonModule.ts] ////

//// [index.ts]
import pkg from "./package.json"
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
//// [index.cts]
import pkg from "./package.json"
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
//// [index.mts]
import pkg from "./package.json"
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "type": "module",
    "default": "misedirection"
}

//// [package.json]
{
    "name": "pkg",
    "version": "0.0.1",
    "type": "module",
    "default": "misedirection"
}
//// [index.js]
import pkg from "./package.json";
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name2 = exports.thing = exports.name = void 0;
const package_json_1 = __importDefault(require("./package.json"));
exports.name = package_json_1.default.name;
const ns = __importStar(require("./package.json"));
exports.thing = ns;
exports.name2 = ns.default.name;
//// [index.mjs]
import pkg from "./package.json";
export const name = pkg.name;
import * as ns from "./package.json";
export const thing = ns;
export const name2 = ns.default.name;


//// [index.d.ts]
export declare const name: string;
export declare const thing: {
    default: {
        name: string;
        version: string;
        type: string;
        default: string;
    };
};
export declare const name2: string;
//// [index.d.cts]
export declare const name: string;
export declare const thing: {
    default: {
        name: string;
        version: string;
        type: string;
        default: string;
    };
    name: string;
    version: string;
    type: string;
};
export declare const name2: string;
//// [index.d.mts]
export declare const name: string;
export declare const thing: {
    default: {
        name: string;
        version: string;
        type: string;
        default: string;
    };
};
export declare const name2: string;
