//// [tests/cases/compiler/unusedImports_entireImportDeclaration.ts] ////

//// [a.ts]
export const a = 0;
export const b = 0;
export default 0;

//// [b.ts]
import d1, { a as a1, b as b1 } from "./a";
import d2, * as ns from "./a";

import d3, { a as a2, b as b2 } from "./a";
d3;
import d4, * as ns2 from "./a";
d4;
import d5, * as ns3 from "./a";
ns3;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = exports.a = void 0;
exports.a = 0;
exports.b = 0;
exports.default = 0;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a");
a_1.default;
var a_2 = require("./a");
a_2.default;
var ns3 = require("./a");
ns3;
