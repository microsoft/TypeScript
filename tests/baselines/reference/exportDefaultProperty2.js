//// [tests/cases/compiler/exportDefaultProperty2.ts] ////

//// [a.ts]
// This test is just like exportEqualsProperty2, but with `export default`.

class C {
    static B: number;
}
namespace C {
    export interface B { c: number }
}

export default C.B;

//// [b.ts]
import B from "./a";
const x: B = { c: B };


//// [a.js]
"use strict";
// This test is just like exportEqualsProperty2, but with `export default`.
exports.__esModule = true;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports["default"] = C.B;
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
var x = { c: a_1["default"] };
