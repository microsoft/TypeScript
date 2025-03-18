//// [tests/cases/compiler/exportDefaultProperty2.ts] ////

//// [a.ts]
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
Object.defineProperty(exports, "__esModule", { value: true });
class C {
    static B;
}
exports.default = C.B;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a_1 = require("./a");
const x = { c: a_1.default };
