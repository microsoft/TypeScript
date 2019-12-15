//// [tests/cases/compiler/emitExtensionResolveExtToTSFile.ts] ////

//// [0.ts]
export default 0

//// [1.ts]
import value from './0.mjs'
value + 1


//// [0.mjs]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [1.mjs]
"use strict";
exports.__esModule = true;
var _0_mjs_1 = require("./0.mjs");
_0_mjs_1["default"] + 1;
