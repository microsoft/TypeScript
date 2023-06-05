//// [tests/cases/conformance/externalModules/typeOnlyMerge1.ts] ////

//// [a.ts]
interface A {}
export type { A };

//// [b.ts]
import { A } from "./a";
const A = 0;
export { A };

//// [c.ts]
import { A } from "./b";
A;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = 0;
exports.A = A;
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
b_1.A;
