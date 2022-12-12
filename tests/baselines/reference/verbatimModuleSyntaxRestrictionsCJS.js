//// [tests/cases/conformance/externalModules/verbatimModuleSyntaxRestrictionsCJS.ts] ////

//// [decl.d.ts]
declare function esmy(): void;
export default esmy;
export declare function funciton(): void;

//// [main.ts]
import esmy from "./decl"; // error
import * as esmy2 from "./decl"; // error
import { funciton } from "./decl"; // error
import type { funciton as funciton2 } from "./decl"; // ok I guess?
import("./decl"); // error
type T = typeof import("./decl"); // ok
export {}; // error
export const x = 1; // error
export interface I {} // ok
export type { T }; // ok

//// [main2.ts]
export interface I {}
export = { x: 1 };

//// [main3.ts]
namespace ns {
    export const x = 1;
    export interface I {}
}
export = ns;

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
exports.x = void 0;
const decl_1 = __importDefault(require("./decl")); // error
const esmy2 = __importStar(require("./decl")); // error
const decl_2 = require("./decl"); // error
Promise.resolve().then(() => __importStar(require("./decl"))); // error
exports.x = 1; // error
//// [main2.js]
"use strict";
module.exports = { x: 1 };
//// [main3.js]
"use strict";
var ns;
(function (ns) {
    ns.x = 1;
})(ns || (ns = {}));
module.exports = ns;
