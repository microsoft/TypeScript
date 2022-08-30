//// [tests/cases/compiler/typeAnnotationOnDefaultExport2.ts] ////

//// [a.ts]
interface I {
    a: boolean;
    b: boolean;
}

export default: I = { c: false };

//// [b.ts]
import a from "./a";
a;


//// [a.js]
"use strict";
exports.__esModule = true;
exports["default"] = { c: false };
//// [b.js]
"use strict";
exports.__esModule = true;
var a_1 = require("./a");
a_1["default"];
