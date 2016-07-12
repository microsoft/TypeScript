//// [tests/cases/compiler/relativeModuleWithoutSlash.ts] ////

//// [index.ts]
export default 0;

//// [index.ts]
export default 1;

//// [a.ts]
import parent from "..";
import here from ".";
parent + here;


//// [index.js]
"use strict";
exports.__esModule = true;
exports["default"] = 0;
//// [index.js]
"use strict";
exports.__esModule = true;
exports["default"] = 1;
//// [a.js]
"use strict";
var __1 = require("..");
var _1 = require(".");
__1["default"] + _1["default"];
