//// [tests/cases/compiler/exportEqualsProperty2.ts] ////

//// [a.ts]
// This test is just like exportDefaultProperty2, but with `export =`.

class C {
    static B: number;
}
namespace C {
    export interface B { c: number }
}

export = C.B;

//// [b.ts]
import B = require("./a");
const x: B = { c: B };


//// [a.js]
"use strict";
// This test is just like exportDefaultProperty2, but with `export =`.
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
module.exports = C.B;
//// [b.js]
"use strict";
exports.__esModule = true;
var B = require("./a");
var x = { c: B };
