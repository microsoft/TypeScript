//// [tests/cases/compiler/noImplicitExtensionNameError.ts] ////

//// [0.ts]
export default 0

//// [1.ts]
// Should be error
import num from './0'
// Should be okay
import num2 from './0.js'
num + num2


//// [0.js]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [1.js]
"use strict";
exports.__esModule = true;
// Should be error
var _0_1 = require("./0");
// Should be okay
var _0_js_1 = require("./0.js");
_0_1["default"] + _0_js_1["default"];
