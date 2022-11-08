// @preserveValueImports: true
// @isolatedModules: true,false
// @module: esnext

// @Filename: a.ts
export default {};
export const b = 0;
export const c = 1;
export interface D {}

// @Filename: b.ts
import a, { b, c, D } from "./a";

// @Filename: c.ts
import * as a from "./a";

// @Filename: d.ts
export = {};

// @Filename: e.ts
import D = require("./d");
import DD = require("./d");
DD;

// @Filename: f.ts
import type a from "./a";
import { b, c } from "./a";
b;
