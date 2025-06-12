//// [tests/cases/conformance/node/legacyNodeModulesExportsSpecifierGenerationConditions.ts] ////

//// [index.ts]
export const a = async () => (await import("inner")).x();
//// [index.d.ts]
export { x } from "./other.js";
//// [other.d.ts]
import { Thing } from "./private.js"
export const x: () => Thing;
//// [private.d.ts]
export interface Thing {} // not exported in export map, inaccessible under new module modes
//// [package.json]
{
    "name": "package",
    "private": true,
    "type": "module",
    "exports": "./index.js"
}
//// [package.json]
{
    "name": "inner",
    "private": true,
    "type": "module",
    "exports": {
        ".": {
            "default": "./index.js"
        },
        "./other": {
            "default": "./other.js"
        }
    }
}

//// [index.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const a = () => __awaiter(void 0, void 0, void 0, function* () { return (yield Promise.resolve().then(function () { return require("inner"); })).x(); });
exports.a = a;


//// [index.d.ts]
export declare const a: () => Promise<import("inner/private").Thing>;
