//// [tests/cases/compiler/contentMapperFilteredDynamicImport.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["compiler-test-mapper"] } }
}

//// [data.toml]
const __VERSION = "1.0.0";
export const data = 1;

//// [main.ts]
declare const path: string;
export const dynamic = import(path);
export const template = import(`./${path}.toml`);
export const parenthesized = import(("./data.toml"));
export const literal = import("./data.toml");
export const literalTemplate = import(`./data.toml`);
declare function require(path: string): unknown;
export const tsRequire = require(path);

//// [require.js]
/** @type {string} */
const path = "./data.toml";
export const dynamic = import(path);
export const required = require(path);
export const template = require(`./${path}.toml`);
export const literal = require("./data.toml");
export const literalTemplate = require(`./data.toml`);

//// [globals.d.ts]
declare function require(path: string): unknown;


//// [main.js]
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
exports.tsRequire = exports.literalTemplate = exports.literal = exports.parenthesized = exports.template = exports.dynamic = void 0;
exports.dynamic = Promise.resolve(`${path}`).then(s => __importStar(require(s)));
exports.template = Promise.resolve(`${`./${path}.toml`}`).then(s => __importStar(require(s)));
exports.parenthesized = Promise.resolve(`${("./data.toml")}`).then(s => __importStar(require(s)));
exports.literal = Promise.resolve().then(() => __importStar(require("./data.js")));
exports.literalTemplate = Promise.resolve().then(() => __importStar(require(`./data.js`)));
exports.tsRequire = require(path);
//// [require.js]
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
exports.literalTemplate = exports.literal = exports.template = exports.required = exports.dynamic = void 0;
/** @type {string} */
const path = "./data.toml";
exports.dynamic = Promise.resolve(`${path}`).then(s => __importStar(require(s)));
exports.required = require(path);
exports.template = require(`./${path}.toml`);
exports.literal = require("./data.js");
exports.literalTemplate = require(`./data.js`);
