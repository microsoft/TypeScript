//// [tests/cases/conformance/importSource/importSource25.ts] ////

//// [a.d.ts]
declare module "*.txt";

//// [b.ts]
import source a from "./a.txt";
export { a as value };

//// [c.ts]
import source a from "././a.txt";
export { a as value };

//// [d.ts]
export * from "./b.js";
export * from "./c.js";

//// [e.ts]
import { value } from "./d.js";
value;

//// [f.ts]
import source a from "./b.txt";
export { a as value };

//// [g.ts]
export * from "./b.js";
export * from "./f.js";

//// [h.ts]
import { value } from "./g.js";
value;


//// [b.js]
import source a from "./a.txt";
export { a as value };
//// [c.js]
import source a from "././a.txt";
export { a as value };
//// [d.js]
export * from "./b.js";
export * from "./c.js";
//// [e.js]
import { value } from "./d.js";
value;
//// [f.js]
import source a from "./b.txt";
export { a as value };
//// [g.js]
export * from "./b.js";
export * from "./f.js";
//// [h.js]
import { value } from "./g.js";
value;
