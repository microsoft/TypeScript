//// [tests/cases/conformance/es6/modules/reExportDefaultExport.ts] ////

//// [m1.ts]
export default function f() {
}
export {f};


//// [m2.ts]
import foo from "./m1";
import {f} from "./m1";

f();
foo();

//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
function f() {
}
exports.default = f;
exports.f = f;
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = require("./m1");
var m1_2 = require("./m1");
(0, m1_2.f)();
(0, m1_1.default)();
