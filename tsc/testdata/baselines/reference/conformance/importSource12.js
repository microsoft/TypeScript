//// [tests/cases/conformance/importSource/importSource12.ts] ////

//// [a.ts]
export {};

//// [b.ts]
import source a from "./a.ts";
export { a };
export const b = import.source("./a.ts");


//// [a.js]
//// [b.js]
import source a from "./a.js";
export { a };
export const b = import.source("./a.js");
