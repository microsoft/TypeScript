//// [tests/cases/compiler/typeAnnotationOnDefaultExport4.ts] ////

//// [a.ts]
interface I {
    a: number;
    b: number;
}

export default: I = { a: 1, b: 1 };

//// [b.ts]
import a from "./a";
a;


//// [a.js]
"use strict";
exports.__esModule = true;
exports["default"] = { a: 1, b: 1 };
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
a_1["default"];
