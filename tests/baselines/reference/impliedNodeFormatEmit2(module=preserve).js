//// [tests/cases/compiler/impliedNodeFormatEmit2.ts] ////

//// [package.json]
{}

//// [a.ts]
export const _ = 0;

//// [b.mts]
export const _ = 0;

//// [c.cts]
export const _ = 0;

//// [d.js]
export const _ = 0;

//// [e.mjs]
export const _ = 0;

//// [f.mjs]
export const _ = 0;

//// [g.ts]
import {} from "./a";
import a = require("./a");

//// [h.mts]
import {} from "./a";
import a = require("./a");

//// [i.cts]
import {} from "./a";
import a = require("./a");

//// [dummy.ts]
export {};


//// [a.js]
export const _ = 0;
//// [b.mjs]
export const _ = 0;
//// [c.cjs]
export const _ = 0;
//// [d.js]
export const _ = 0;
//// [e.mjs]
export const _ = 0;
//// [f.mjs]
export const _ = 0;
//// [g.js]
//// [h.mjs]
//// [i.cjs]
//// [dummy.js]
