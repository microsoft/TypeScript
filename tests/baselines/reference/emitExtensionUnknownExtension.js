//// [tests/cases/compiler/emitExtensionUnknownExtension.ts] ////

//// [0.ts]
export default 0

//// [1.ts]
import num from './0.cjs'
num + 1


//// [0.mjs]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [1.mjs]
"use strict";
exports.__esModule = true;
var _0_cjs_1 = require("./0.cjs");
_0_cjs_1["default"] + 1;
