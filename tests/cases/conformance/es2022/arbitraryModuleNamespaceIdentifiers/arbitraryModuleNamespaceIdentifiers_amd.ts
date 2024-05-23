//@module: AMD
//@target: ES2022
//@declaration: true

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
