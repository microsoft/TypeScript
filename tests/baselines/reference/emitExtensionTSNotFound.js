//// [0.ts]
// should not emit error 2961
import num from './1.ts'
num + 1


//// [0.ts]
"use strict";
exports.__esModule = true;
// should not emit error 2961
var _1_ts_1 = require("./1.ts");
_1_ts_1["default"] + 1;
