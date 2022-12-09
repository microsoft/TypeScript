//// [tests/cases/conformance/es6/modules/exportsAndImportsWithUnderscores1.ts] ////

//// [m1.ts]
var R: any
export default R = {
    "__": 20,
    "_": 10
    "___": 30
}

//// [m2.ts]
import R from "./m1";
const { __, _, ___ } = R;


//// [m1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var R;
exports.default = R = {
    "__": 20,
    "_": 10,
    "___": 30
};
//// [m2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var m1_1 = require("./m1");
var __ = m1_1.default.__, _ = m1_1.default._, ___ = m1_1.default.___;
