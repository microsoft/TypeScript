//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_exportEmpty.ts] ////

//// [arbitraryModuleNamespaceIdentifiers_exportEmpty.ts]
// This should result in a type error. In particular, the empty string is a now
// a valid module export name, and should be treated as such here.
const empty = "empty";
export { empty as "" };
import { "" as foo } from "./arbitraryModuleNamespaceIdentifiers_exportEmpty";
const bar: "type error expected here" = foo;


//// [arbitraryModuleNamespaceIdentifiers_exportEmpty.js]
// This should result in a type error. In particular, the empty string is a now
// a valid module export name, and should be treated as such here.
const empty = "empty";
export { empty as "" };
import { "" as foo } from "./arbitraryModuleNamespaceIdentifiers_exportEmpty";
const bar = foo;


//// [arbitraryModuleNamespaceIdentifiers_exportEmpty.d.ts]
declare const empty = "empty";
export { empty as "" };
