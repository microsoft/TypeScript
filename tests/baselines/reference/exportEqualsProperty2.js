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
import B = require("./a.ts");
const x: B = { c: B };


//// [a.js]
// This test is just like exportDefaultProperty2, but with `export =`.
"use strict";
var C = (function () {
    function C() {
    }
    return C;
}());
module.exports = C.B;
//// [b.js]
"use strict";
var B = require("./a.ts");
var x = { c: B };
