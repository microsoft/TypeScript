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
// This test is just like exportEqualsProperty2, but with `export default`.
"use strict";
var C = (function () {
    function C() {
    }
    return C;
}());
exports["default"] = C.B;
exports.__esModule = true;
//// [b.js]
"use strict";
var a_1 = require("./a");
var x = { c: a_1["default"] };
exports.__esModule = true;
