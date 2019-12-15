//// [tests/cases/compiler/emitExtensionRejectResolveTSFile.ts] ////

//// [0.ts]
// For the deno case
export default 0

//// [1.ts]
import num from './0.ts'
num + 1


//// [0.mjs]
"use strict";
exports.__esModule = true;
// For the deno case
exports["default"] = 0;
//// [1.mjs]
"use strict";
exports.__esModule = true;
var _0_ts_1 = require("./0.ts");
_0_ts_1["default"] + 1;
