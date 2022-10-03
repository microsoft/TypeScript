//// [tests/cases/conformance/es6/modules/exportAndImport-es5.ts] ////

//// [m1.ts]
export default function f1() {
}

//// [m2.ts]
import f1 from "./m1";
export default function f2() {
    f1();
}


//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function f1() {
}
exports.default = f1;
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = require("./m1");
function f2() {
    (0, m1_1.default)();
}
exports.default = f2;
