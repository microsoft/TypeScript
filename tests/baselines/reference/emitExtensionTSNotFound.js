//// [0.ts]
// should not emit error 2691 but 2307
import num from './1.ts'
num + 1


//// [0.ts]
"use strict";
exports.__esModule = true;
// should not emit error 2691 but 2307
var _1_ts_1 = require("./1.ts");
_1_ts_1["default"] + 1;
