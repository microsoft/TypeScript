//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_umd.ts] ////

//// [arbitraryModuleNamespaceIdentifiers_umd.ts]
const someValue = "someValue";
type someType = "someType";

export { someValue as "<X>" };
import { "<X>" as valueX } from "./arbitraryModuleNamespaceIdentifiers_umd";
if (valueX !== "someValue") throw "should be someValue";

export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_umd";
import { "<Y>" as valueY } from "./arbitraryModuleNamespaceIdentifiers_umd";
if (valueY !== "someValue") throw "should be someValue";

export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_umd";
import { "<Z>" as valueZ } from "./arbitraryModuleNamespaceIdentifiers_umd";
if (valueZ["<X>"] !== "someValue") throw "should be someValue";
if (valueZ["<Y>"] !== "someValue") throw "should be someValue";
if (valueZ["<Z>"] !== valueZ) throw "should be export namespace";

export { type someType as "<A>" };
import { type "<A>" as typeA } from "./arbitraryModuleNamespaceIdentifiers_umd";
const importTest: typeA = "expect error about someType";

export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_umd";
import { type "<B>" as typeB } from "./arbitraryModuleNamespaceIdentifiers_umd";
const reimportTest: typeB = "expect error about someType";

export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_umd";
import { type "<C>" as typeC } from "./arbitraryModuleNamespaceIdentifiers_umd";
export type otherType = "otherType";
const importStarTestA: typeC.otherType = "expect error about otherType";


//// [arbitraryModuleNamespaceIdentifiers_umd.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./arbitraryModuleNamespaceIdentifiers_umd", "./arbitraryModuleNamespaceIdentifiers_umd", "./arbitraryModuleNamespaceIdentifiers_umd", "./arbitraryModuleNamespaceIdentifiers_umd", "./arbitraryModuleNamespaceIdentifiers_umd"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports["<Z>"] = exports["<Y>"] = exports["<X>"] = void 0;
    const someValue = "someValue";
    exports["<X>"] = someValue;
    const arbitraryModuleNamespaceIdentifiers_umd_1 = require("./arbitraryModuleNamespaceIdentifiers_umd");
    if (arbitraryModuleNamespaceIdentifiers_umd_1["<X>"] !== "someValue")
        throw "should be someValue";
    var arbitraryModuleNamespaceIdentifiers_umd_2 = require("./arbitraryModuleNamespaceIdentifiers_umd");
    Object.defineProperty(exports, "<Y>", { enumerable: true, get: function () { return arbitraryModuleNamespaceIdentifiers_umd_2["<X>"]; } });
    const arbitraryModuleNamespaceIdentifiers_umd_3 = require("./arbitraryModuleNamespaceIdentifiers_umd");
    if (arbitraryModuleNamespaceIdentifiers_umd_3["<Y>"] !== "someValue")
        throw "should be someValue";
    exports["<Z>"] = require("./arbitraryModuleNamespaceIdentifiers_umd");
    const arbitraryModuleNamespaceIdentifiers_umd_4 = require("./arbitraryModuleNamespaceIdentifiers_umd");
    if (arbitraryModuleNamespaceIdentifiers_umd_4["<Z>"]["<X>"] !== "someValue")
        throw "should be someValue";
    if (arbitraryModuleNamespaceIdentifiers_umd_4["<Z>"]["<Y>"] !== "someValue")
        throw "should be someValue";
    if (arbitraryModuleNamespaceIdentifiers_umd_4["<Z>"]["<Z>"] !== arbitraryModuleNamespaceIdentifiers_umd_4["<Z>"])
        throw "should be export namespace";
    const importTest = "expect error about someType";
    const reimportTest = "expect error about someType";
    const importStarTestA = "expect error about otherType";
});


//// [arbitraryModuleNamespaceIdentifiers_umd.d.ts]
declare const someValue = "someValue";
type someType = "someType";
export { someValue as "<X>" };
export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_umd";
export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_umd";
export { type someType as "<A>" };
export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_umd";
export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_umd";
export type otherType = "otherType";
