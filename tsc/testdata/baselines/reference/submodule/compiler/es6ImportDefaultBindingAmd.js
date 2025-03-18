//// [tests/cases/compiler/es6ImportDefaultBindingAmd.ts] ////

//// [es6ImportDefaultBindingAmd_0.ts]
var a = 10;
export default a;

//// [es6ImportDefaultBindingAmd_1.ts]
import defaultBinding from "es6ImportDefaultBindingAmd_0";
var x = defaultBinding;
import defaultBinding2 from "es6ImportDefaultBindingAmd_0"; // elide this import since defaultBinding2 is not used


//// [es6ImportDefaultBindingAmd_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = 10;
exports.default = a;
//// [es6ImportDefaultBindingAmd_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const es6ImportDefaultBindingAmd_0_1 = require("es6ImportDefaultBindingAmd_0");
var x = es6ImportDefaultBindingAmd_0_1.default;
