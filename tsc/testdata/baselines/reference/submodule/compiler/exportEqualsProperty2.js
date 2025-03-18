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
class C {
    static B;
}
module.exports = C.B;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const B = require("./a");
const x = { c: B };
