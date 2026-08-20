//// [tests/cases/conformance/es2022/arbitraryModuleNamespaceIdentifiers/arbitraryModuleNamespaceIdentifiers_importEmpty.ts] ////

//// [arbitraryModuleNamespaceIdentifiers_importEmpty.ts]
// These should all be errors. In particular, the empty string is a now a valid
// module export name, and should be treated as such here.
import {
  "missing" as x,
  "(missing)" as y,
  "" as z,
} from "./arbitraryModuleNamespaceIdentifiers_importEmpty";
const xyz = [x, y, z];


//// [arbitraryModuleNamespaceIdentifiers_importEmpty.js]
// These should all be errors. In particular, the empty string is a now a valid
// module export name, and should be treated as such here.
import { "missing" as x, "(missing)" as y, "" as z, } from "./arbitraryModuleNamespaceIdentifiers_importEmpty";
const xyz = [x, y, z];


//// [arbitraryModuleNamespaceIdentifiers_importEmpty.d.ts]
export {};
