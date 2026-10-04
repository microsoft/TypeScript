//@module: ES2022
//@target: ES2022
//@declaration: true

// These should all be errors. In particular, the empty string is a now a valid
// module export name, and should be treated as such here.
import {
  "missing" as x,
  "(missing)" as y,
  "" as z,
} from "./arbitraryModuleNamespaceIdentifiers_importEmpty";
const xyz = [x, y, z];
