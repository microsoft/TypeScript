//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_es2022.ts] ////

//// [arbitraryModuleNamespaceIdentifiers_es2022.ts]
const someValue = "someValue";
type someType = "someType";

export { someValue as "<X>" };
import { "<X>" as valueX } from "./arbitraryModuleNamespaceIdentifiers_es2022";
if (valueX !== "someValue") throw "should be someValue";

export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_es2022";
import { "<Y>" as valueY } from "./arbitraryModuleNamespaceIdentifiers_es2022";
if (valueY !== "someValue") throw "should be someValue";

export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_es2022";
import { "<Z>" as valueZ } from "./arbitraryModuleNamespaceIdentifiers_es2022";
if (valueZ["<X>"] !== "someValue") throw "should be someValue";
if (valueZ["<Y>"] !== "someValue") throw "should be someValue";
if (valueZ["<Z>"] !== valueZ) throw "should be export namespace";

export { type someType as "<A>" };
import { type "<A>" as typeA } from "./arbitraryModuleNamespaceIdentifiers_es2022";
const importTest: typeA = "expect error about someType";

export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_es2022";
import { type "<B>" as typeB } from "./arbitraryModuleNamespaceIdentifiers_es2022";
const reimportTest: typeB = "expect error about someType";

export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_es2022";
import { type "<C>" as typeC } from "./arbitraryModuleNamespaceIdentifiers_es2022";
export type otherType = "otherType";
const importStarTestA: typeC.otherType = "expect error about otherType";


//// [arbitraryModuleNamespaceIdentifiers_es2022.js]
const someValue = "someValue";
export { someValue as "<X>" };
import { "<X>" as valueX } from "./arbitraryModuleNamespaceIdentifiers_es2022";
if (valueX !== "someValue")
    throw "should be someValue";
export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_es2022";
import { "<Y>" as valueY } from "./arbitraryModuleNamespaceIdentifiers_es2022";
if (valueY !== "someValue")
    throw "should be someValue";
export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_es2022";
import { "<Z>" as valueZ } from "./arbitraryModuleNamespaceIdentifiers_es2022";
if (valueZ["<X>"] !== "someValue")
    throw "should be someValue";
if (valueZ["<Y>"] !== "someValue")
    throw "should be someValue";
if (valueZ["<Z>"] !== valueZ)
    throw "should be export namespace";
const importTest = "expect error about someType";
const reimportTest = "expect error about someType";
const importStarTestA = "expect error about otherType";


//// [arbitraryModuleNamespaceIdentifiers_es2022.d.ts]
declare const someValue = "someValue";
type someType = "someType";
export { someValue as "<X>" };
export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_es2022";
export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_es2022";
export { type someType as "<A>" };
export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_es2022";
export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_es2022";
export type otherType = "otherType";
