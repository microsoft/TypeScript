//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_module.ts] ////

//// [arbitraryModuleNamespaceIdentifiers_module.ts]
const someValue = "someValue";
type someType = "someType";

export { someValue as "<X>" };
import { "<X>" as valueX } from "./arbitraryModuleNamespaceIdentifiers_module";
if (valueX !== "someValue") throw "should be someValue";

export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_module";
import { "<Y>" as valueY } from "./arbitraryModuleNamespaceIdentifiers_module";
if (valueY !== "someValue") throw "should be someValue";

export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_module";
import { "<Z>" as valueZ } from "./arbitraryModuleNamespaceIdentifiers_module";
if (valueZ["<X>"] !== "someValue") throw "should be someValue";
if (valueZ["<Y>"] !== "someValue") throw "should be someValue";
if (valueZ["<Z>"] !== valueZ) throw "should be export namespace";

export { type someType as "<A>" };
import { type "<A>" as typeA } from "./arbitraryModuleNamespaceIdentifiers_module";
const importTest: typeA = "expect error about someType";

export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_module";
import { type "<B>" as typeB } from "./arbitraryModuleNamespaceIdentifiers_module";
const reimportTest: typeB = "expect error about someType";

export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_module";
import { type "<C>" as typeC } from "./arbitraryModuleNamespaceIdentifiers_module";
export type otherType = "otherType";
const importStarTestA: typeC.otherType = "expect error about otherType";


//// [arbitraryModuleNamespaceIdentifiers_module.js]
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
exports["<Z>"] = exports["<Y>"] = exports["<X>"] = void 0;
const someValue = "someValue";
exports["<X>"] = someValue;
const arbitraryModuleNamespaceIdentifiers_module_1 = require("./arbitraryModuleNamespaceIdentifiers_module");
if (arbitraryModuleNamespaceIdentifiers_module_1["<X>"] !== "someValue")
    throw "should be someValue";
var arbitraryModuleNamespaceIdentifiers_module_2 = require("./arbitraryModuleNamespaceIdentifiers_module");
Object.defineProperty(exports, "<Y>", { enumerable: true, get: function () { return arbitraryModuleNamespaceIdentifiers_module_2["<X>"]; } });
const arbitraryModuleNamespaceIdentifiers_module_3 = require("./arbitraryModuleNamespaceIdentifiers_module");
if (arbitraryModuleNamespaceIdentifiers_module_3["<Y>"] !== "someValue")
    throw "should be someValue";
exports["<Z>"] = __importStar(require("./arbitraryModuleNamespaceIdentifiers_module"));
const arbitraryModuleNamespaceIdentifiers_module_4 = require("./arbitraryModuleNamespaceIdentifiers_module");
if (arbitraryModuleNamespaceIdentifiers_module_4["<Z>"]["<X>"] !== "someValue")
    throw "should be someValue";
if (arbitraryModuleNamespaceIdentifiers_module_4["<Z>"]["<Y>"] !== "someValue")
    throw "should be someValue";
if (arbitraryModuleNamespaceIdentifiers_module_4["<Z>"]["<Z>"] !== arbitraryModuleNamespaceIdentifiers_module_4["<Z>"])
    throw "should be export namespace";
const importTest = "expect error about someType";
const reimportTest = "expect error about someType";
const importStarTestA = "expect error about otherType";


//// [arbitraryModuleNamespaceIdentifiers_module.d.ts]
declare const someValue = "someValue";
type someType = "someType";
export { someValue as "<X>" };
export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_module";
export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_module";
export { type someType as "<A>" };
export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_module";
export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_module";
export type otherType = "otherType";
