//// [tests/cases/compiler/checkJsdocTypeTagOnExportAssignment2.ts] ////

//// [checkJsdocTypeTagOnExportAssignment2.js]

//// [a.ts]
export interface Foo {
    a: number;
    b: number;
}

//// [b.js]
/** @type {import("./a").Foo} */
export default { c: false };

//// [c.js]
import b from "./b";
b;


//// [checkJsdocTypeTagOnExportAssignment2.js]
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import("./a").Foo} */
exports.default = { c: false };
//// [c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
b_1.default;
