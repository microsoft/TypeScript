//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_amd.ts] ////

//// [arbitraryModuleNamespaceIdentifiers_amd.ts]
const someValue = "someValue";
type someType = "someType";

export { someValue as "<X>" };
import { "<X>" as valueX } from "./arbitraryModuleNamespaceIdentifiers_amd";
if (valueX !== "someValue") throw "should be someValue";

export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_amd";
import { "<Y>" as valueY } from "./arbitraryModuleNamespaceIdentifiers_amd";
if (valueY !== "someValue") throw "should be someValue";

export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_amd";
import { "<Z>" as valueZ } from "./arbitraryModuleNamespaceIdentifiers_amd";
if (valueZ["<X>"] !== "someValue") throw "should be someValue";
if (valueZ["<Y>"] !== "someValue") throw "should be someValue";
if (valueZ["<Z>"] !== valueZ) throw "should be export namespace";

export { type someType as "<A>" };
import { type "<A>" as typeA } from "./arbitraryModuleNamespaceIdentifiers_amd";
const importTest: typeA = "expect error about someType";

export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_amd";
import { type "<B>" as typeB } from "./arbitraryModuleNamespaceIdentifiers_amd";
const reimportTest: typeB = "expect error about someType";

export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_amd";
import { type "<C>" as typeC } from "./arbitraryModuleNamespaceIdentifiers_amd";
export type otherType = "otherType";
const importStarTestA: typeC.otherType = "expect error about otherType";


//// [arbitraryModuleNamespaceIdentifiers_amd.js]
define(["require", "exports", "./arbitraryModuleNamespaceIdentifiers_amd", "./arbitraryModuleNamespaceIdentifiers_amd", "./arbitraryModuleNamespaceIdentifiers_amd", "./arbitraryModuleNamespaceIdentifiers_amd", "./arbitraryModuleNamespaceIdentifiers_amd"], function (require, exports, arbitraryModuleNamespaceIdentifiers_amd_1, arbitraryModuleNamespaceIdentifiers_amd_2, arbitraryModuleNamespaceIdentifiers_amd_3, arbitraryModuleNamespaceIdentifiers_amd_4, arbitraryModuleNamespaceIdentifiers_amd_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports["<Z>"] = exports["<Y>"] = exports["<X>"] = void 0;
    const someValue = "someValue";
    exports["<X>"] = someValue;
    if (arbitraryModuleNamespaceIdentifiers_amd_1["<X>"] !== "someValue")
        throw "should be someValue";
    Object.defineProperty(exports, "<Y>", { enumerable: true, get: function () { return arbitraryModuleNamespaceIdentifiers_amd_2["<X>"]; } });
    if (arbitraryModuleNamespaceIdentifiers_amd_3["<Y>"] !== "someValue")
        throw "should be someValue";
    exports["<Z>"] = arbitraryModuleNamespaceIdentifiers_amd_4;
    if (arbitraryModuleNamespaceIdentifiers_amd_5["<Z>"]["<X>"] !== "someValue")
        throw "should be someValue";
    if (arbitraryModuleNamespaceIdentifiers_amd_5["<Z>"]["<Y>"] !== "someValue")
        throw "should be someValue";
    if (arbitraryModuleNamespaceIdentifiers_amd_5["<Z>"]["<Z>"] !== arbitraryModuleNamespaceIdentifiers_amd_5["<Z>"])
        throw "should be export namespace";
    const importTest = "expect error about someType";
    const reimportTest = "expect error about someType";
    const importStarTestA = "expect error about otherType";
});


//// [arbitraryModuleNamespaceIdentifiers_amd.d.ts]
declare const someValue = "someValue";
type someType = "someType";
export { someValue as "<X>" };
export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_amd";
export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_amd";
export { type someType as "<A>" };
export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_amd";
export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_amd";
export type otherType = "otherType";
