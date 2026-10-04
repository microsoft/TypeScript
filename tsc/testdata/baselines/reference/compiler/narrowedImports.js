//// [tests/cases/compiler/narrowedImports.ts] ////

//// [a.d.ts]
declare const a0: number | undefined;
export default a0;
export const a1: number | undefined;

//// [b.d.ts]
declare const b: number | undefined;
declare namespace b {}
export = b;

//// [x.ts]
import a0, { a1, a1 as a2 } from "./a";
import * as b0 from "./b";
import b1 = require("./b");

let x: number;

if (a0) x = a0;
if (a1) x = a1;
if (a2) x = a2;
if (b0) x = b0;
if (b1) x = b1;


//// [x.js]
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
const a_1 = __importStar(require("./a"));
const b0 = __importStar(require("./b"));
const b1 = require("./b");
let x;
if (a_1.default)
    x = a_1.default;
if (a_1.a1)
    x = a_1.a1;
if (a_1.a1)
    x = a_1.a1;
if (b0)
    x = b0;
if (b1)
    x = b1;
