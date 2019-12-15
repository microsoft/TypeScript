//// [tests/cases/compiler/noImplicitExtensionNameWithEmitExtension.ts] ////

//// [0.ts]
export default 0

//// [1.ts]
import num from './0.mjs'
// should be error
import num2 from './0'
num + num2


//// [0.mjs]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [1.mjs]
"use strict";
exports.__esModule = true;
var _0_mjs_1 = require("./0.mjs");
// should be error
var _0_1 = require("./0");
_0_mjs_1["default"] + _0_1["default"];
