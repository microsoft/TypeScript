//// [tests/cases/compiler/exportDefaultQualifiedNameNoError.ts] ////

//// [code.ts]
class C { static x = 0; };
export default C.x;
//// [usage.ts]
import def from "./code";
void def;

//// [code.js]
"use strict";
exports.__esModule = true;
var C = /** @class */ (function () {
    function C() {
    }
    (function () {
        C.x = 0;
    }).call(C);
    return C;
}());
;
exports["default"] = C.x;
//// [usage.js]
"use strict";
exports.__esModule = true;
var code_1 = require("./code");
void code_1["default"];
