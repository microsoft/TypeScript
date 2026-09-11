//// [tests/cases/conformance/importSource/importSource6.ts] ////

//// [a.ts]
export default 1;

//// [b.ts]
import source a from "./a.js";
const b = import.source("./a.js");


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 1;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b = import.source("./a.js");
