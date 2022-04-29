//// [tests/cases/compiler/newAbstractInstance2.ts] ////

//// [a.ts]
export default abstract class {}

//// [b.ts]
import A from "./a";
new A();


//// [a.js]
"use strict";
exports.__esModule = true;
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    return default_1;
}());
exports["default"] = default_1;
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
new a_1["default"]();
