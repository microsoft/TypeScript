//// [tests/cases/conformance/importSource/importSource25.ts] ////

//// [a.d.ts]
declare module "*.txt";
declare module "*.asset" with { type: "css" } {}
declare module "*.asset" with { type: "text" } {}

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

//// [i.ts]
import source a from "./file.asset" with { type: "css" };
export { a as value };

//// [j.ts]
import source a from "./file.asset" with { type: "text" };
export { a as value };

//// [k.ts]
export * from "./i.js";
export * from "./j.js";


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
//// [i.js]
import source a from "./file.asset" with { type: "css" };
export { a as value };
//// [j.js]
import source a from "./file.asset" with { type: "text" };
export { a as value };
//// [k.js]
export * from "./i.js";
export * from "./j.js";
