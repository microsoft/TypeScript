//@module: ES2015
//@target: ESNext
//@declaration: true

const someValue = "someValue";
type someType = "someType";

export { someValue as "<X>" };
import { "<X>" as valueX } from "./arbitraryModuleNamespaceIdentifiers_es2015";
if (valueX !== "someValue") throw "should be someValue";

export { "<X>" as "<Y>" } from "./arbitraryModuleNamespaceIdentifiers_es2015";
import { "<Y>" as valueY } from "./arbitraryModuleNamespaceIdentifiers_es2015";
if (valueY !== "someValue") throw "should be someValue";

export * as "<Z>" from "./arbitraryModuleNamespaceIdentifiers_es2015";
import { "<Z>" as valueZ } from "./arbitraryModuleNamespaceIdentifiers_es2015";
if (valueZ["<X>"] !== "someValue") throw "should be someValue";
if (valueZ["<Y>"] !== "someValue") throw "should be someValue";
if (valueZ["<Z>"] !== valueZ) throw "should be export namespace";

export { type someType as "<A>" };
import { type "<A>" as typeA } from "./arbitraryModuleNamespaceIdentifiers_es2015";
const importTest: typeA = "expect error about someType";

export { type "<A>" as "<B>" } from "./arbitraryModuleNamespaceIdentifiers_es2015";
import { type "<B>" as typeB } from "./arbitraryModuleNamespaceIdentifiers_es2015";
const reimportTest: typeB = "expect error about someType";

export type * as "<C>" from "./arbitraryModuleNamespaceIdentifiers_es2015";
import { type "<C>" as typeC } from "./arbitraryModuleNamespaceIdentifiers_es2015";
export type otherType = "otherType";
const importStarTestA: typeC.otherType = "expect error about otherType";
