//// [tests/cases/compiler/es2022stringExportError.ts] ////

//// [mod.ts]
const a = 1;
export { a }

//// [index.ts]
export { "non-ident" };

//// [index2.ts]
import { "a" as "b" } from "./mod";


//// [mod.js]
var a = 1;
export { a };
//// [index.js]
export { "non-ident" };
//// [index2.js]
export {};
