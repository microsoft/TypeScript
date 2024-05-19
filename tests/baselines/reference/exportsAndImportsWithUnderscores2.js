//// [tests/cases/conformance/es6/modules/exportsAndImportsWithUnderscores2.ts] ////

//// [m1.ts]
var R: any
export default R = {
    "__esmodule": true,
    "__proto__": {}
}

//// [m2.ts]
import R from "./m1";
const { __esmodule, __proto__ } = R;


//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R;
exports.default = R = {
    "__esmodule": true,
    "__proto__": {}
};
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = require("./m1");
var __esmodule = m1_1.default.__esmodule, __proto__ = m1_1.default.__proto__;
