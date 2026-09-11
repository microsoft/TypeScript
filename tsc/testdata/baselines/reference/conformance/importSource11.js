//// [tests/cases/conformance/importSource/importSource11.ts] ////

//// [a.ts]
export const a = 1;

//// [b.ts]
import source a from "./a.js";
const b = import.source("./a.js");

const c: any = a;
const d: Promise<any> = b;


//// [a.js]
export const a = 1;
//// [b.js]
import source a from "./a.js";
const b = import.source("./a.js");
const c = a;
const d = b;
