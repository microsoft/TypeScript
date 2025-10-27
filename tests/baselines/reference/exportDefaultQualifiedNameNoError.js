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
var C = /** @class */ (function () {
    function C() {
    }
    C.x = 0;
    return C;
}());
;
exports.default = C.x;
//// [usage.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var code_1 = require("./code");
void code_1.default;
