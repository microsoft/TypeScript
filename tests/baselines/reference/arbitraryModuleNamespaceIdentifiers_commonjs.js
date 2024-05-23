//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_commonjs.ts] ////

//// [arbitraryModuleNamespaceIdentifiers_commonjs.ts]
const someValue = "someValue";
type someType = "someType";

export { someValue as "<X>" };
import { "<X>" as valueX } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
if (valueX !== "someValue") throw "should be someValue";

export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
import { "<Y>" as valueY } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
if (valueY !== "someValue") throw "should be someValue";

export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_commonjs";
import { "<Z>" as valueZ } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
if (valueZ["<X>"] !== "someValue") throw "should be someValue";
if (valueZ["<Y>"] !== "someValue") throw "should be someValue";
if (valueZ["<Z>"] !== valueZ) throw "should be export namespace";

export { type someType as "<A>" };
import { type "<A>" as typeA } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
const importTest: typeA = "expect error about someType";

export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
import { type "<B>" as typeB } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
const reimportTest: typeB = "expect error about someType";

export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_commonjs";
import { type "<C>" as typeC } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
export type otherType = "otherType";
const importStarTestA: typeC.otherType = "expect error about otherType";


//// [arbitraryModuleNamespaceIdentifiers_commonjs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports["<Z>"] = exports["<Y>"] = exports["<X>"] = void 0;
const someValue = "someValue";
exports["<X>"] = someValue;
const arbitraryModuleNamespaceIdentifiers_commonjs_1 = require("./arbitraryModuleNamespaceIdentifiers_commonjs");
if (arbitraryModuleNamespaceIdentifiers_commonjs_1["<X>"] !== "someValue")
    throw "should be someValue";
var arbitraryModuleNamespaceIdentifiers_commonjs_2 = require("./arbitraryModuleNamespaceIdentifiers_commonjs");
Object.defineProperty(exports, "<Y>", { enumerable: true, get: function () { return arbitraryModuleNamespaceIdentifiers_commonjs_2["<X>"]; } });
const arbitraryModuleNamespaceIdentifiers_commonjs_3 = require("./arbitraryModuleNamespaceIdentifiers_commonjs");
if (arbitraryModuleNamespaceIdentifiers_commonjs_3["<Y>"] !== "someValue")
    throw "should be someValue";
exports["<Z>"] = require("./arbitraryModuleNamespaceIdentifiers_commonjs");
const arbitraryModuleNamespaceIdentifiers_commonjs_4 = require("./arbitraryModuleNamespaceIdentifiers_commonjs");
if (arbitraryModuleNamespaceIdentifiers_commonjs_4["<Z>"]["<X>"] !== "someValue")
    throw "should be someValue";
if (arbitraryModuleNamespaceIdentifiers_commonjs_4["<Z>"]["<Y>"] !== "someValue")
    throw "should be someValue";
if (arbitraryModuleNamespaceIdentifiers_commonjs_4["<Z>"]["<Z>"] !== arbitraryModuleNamespaceIdentifiers_commonjs_4["<Z>"])
    throw "should be export namespace";
const importTest = "expect error about someType";
const reimportTest = "expect error about someType";
const importStarTestA = "expect error about otherType";


//// [arbitraryModuleNamespaceIdentifiers_commonjs.d.ts]
declare const someValue = "someValue";
type someType = "someType";
export { someValue as "<X>" };
export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_commonjs";
export { type someType as "<A>" };
export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_commonjs";
export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_commonjs";
export type otherType = "otherType";
