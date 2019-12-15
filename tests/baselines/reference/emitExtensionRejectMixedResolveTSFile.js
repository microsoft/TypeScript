//// [tests/cases/compiler/emitExtensionRejectMixedResolveTSFile.ts] ////

//// [0.ts]
// For the deno case
export default 0

//// [1.ts]
import num from './0.ts'
import num2 from './2.tsx'
num + num2

//// [2.tsx]
export default 1


//// [0.tsx]
"use strict";
exports.__esModule = true;
// For the deno case
exports["default"] = 0;
//// [2.tsx]
"use strict";
exports.__esModule = true;
exports["default"] = 1;
//// [1.tsx]
"use strict";
exports.__esModule = true;
var _0_ts_1 = require("./0.ts");
var _2_tsx_1 = require("./2.tsx");
_0_ts_1["default"] + _2_tsx_1["default"];
