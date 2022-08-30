//// [tests/cases/compiler/typeAnnotationOnDefaultExport3.ts] ////

//// [a.ts]
interface I {
    a: boolean;
    b: boolean;
}
const a = { c: 1 };
export default: I = a;

//// [b.ts]
import a from "./a";
a;


//// [a.js]
"use strict";
exports.__esModule = true;
var a = { c: 1 };
exports["default"] = a;
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
a_1["default"];
