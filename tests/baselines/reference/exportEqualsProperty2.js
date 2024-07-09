//// [tests/cases/compiler/exportEqualsProperty2.ts] ////

//// [a.ts]
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
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
module.exports = C.B;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("./a");
var x = { c: B };
