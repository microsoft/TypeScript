//// [tests/cases/compiler/exportDefaultQualifiedNameNoError.ts] ////

//// [code.ts]
class C { static x = 0; };
export default C.x;
//// [usage.ts]
import def from "./code";
void def;

//// [code.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
    static x = 0;
}
;
exports.default = C.x;
//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code_1 = require("./code");
void code_1.default;
