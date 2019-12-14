//// [tests/cases/compiler/emitExtensionEmitCustomExtnameWithDot.ts] ////

//// [0.ts]
export default 1

//// [1.ts]
import x from './0'
x + 1


//// [0.strange.js]
"use strict";
exports.__esModule = true;
exports["default"] = 1;
//// [1.strange.js]
"use strict";
exports.__esModule = true;
var _0_1 = require("./0");
_0_1["default"] + 1;
