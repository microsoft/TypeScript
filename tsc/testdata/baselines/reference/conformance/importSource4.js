//// [tests/cases/conformance/importSource/importSource4.ts] ////

//// [a.ts]
export default 1;
export const a = 2;

//// [b.ts]
import source * as a from "./a.js";

//// [c.ts]
import source { a } from "./a.js";

//// [d.ts]
import source a, { a as b } from "./a.js";

//// [e.ts]
import source "./a.js";

//// [f.ts]
import source type a from "./a.js";


//// [a.js]
export default 1;
export const a = 2;
//// [b.js]
export {};
//// [c.js]
export {};
//// [d.js]
export {};
//// [e.js]
export {};
//// [f.js]
from;
"./a.js";
export {};
