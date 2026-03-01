//@module: ES2022
//@target: ES2022
//@declaration: true

// This should result in a type error. In particular, the empty string is a now
// a valid module export name, and should be treated as such here.
const empty = "empty";
export { empty as "" };
import { "" as foo } from "./arbitraryModuleNamespaceIdentifiers_exportEmpty";
const bar: "type error expected here" = foo;
