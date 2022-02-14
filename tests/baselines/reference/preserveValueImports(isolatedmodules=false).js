//// [tests/cases/conformance/externalModules/typeOnly/preserveValueImports.ts] ////

//// [a.ts]
export default {};
export const b = 0;
export const c = 1;
export interface D {}

//// [b.ts]
import a, { b, c, D } from "./a";

//// [c.ts]
import * as a from "./a";

//// [d.ts]
export = {};

//// [e.ts]
import D = require("./d");
import DD = require("./d");
DD;

//// [f.ts]
import type a from "./a";
import { b, c } from "./a";
b;


//// [a.js]
export default {};
export var b = 0;
export var c = 1;
//// [b.js]
import a, { b, c } from "./a";
//// [c.js]
import * as a from "./a";
//// [d.js]
export {};
//// [e.js]
DD;
export {};
//// [f.js]
import { b, c } from "./a";
b;
