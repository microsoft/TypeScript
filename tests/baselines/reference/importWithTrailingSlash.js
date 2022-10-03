//// [tests/cases/compiler/importWithTrailingSlash.ts] ////

//// [a.ts]
export default { a: 0 };

//// [index.ts]
export default { aIndex: 0 };

//// [test.ts]
import a from ".";
import aIndex from "./";
a.a;
aIndex.aIndex;

//// [test.ts]
import a from "..";
import aIndex from "../";
a.a;
aIndex.aIndex;


//// [a.js]
"use strict";
exports.__esModule = true;
exports["default"] = { a: 0 };
//// [index.js]
"use strict";
exports.__esModule = true;
exports["default"] = { aIndex: 0 };
//// [test.js]
"use strict";
exports.__esModule = true;
var _1 = require(".");
var _2 = require("./");
_1["default"].a;
_2["default"].aIndex;
//// [test.js]
"use strict";
exports.__esModule = true;
var __1 = require("..");
var __2 = require("../");
__1["default"].a;
__2["default"].aIndex;
