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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
exports.__esModule = true;
var _1 = __importDefault(require("."));
var _2 = __importDefault(require("./"));
_1["default"].a;
_2["default"].aIndex;
//// [test.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
exports.__esModule = true;
var __1 = __importDefault(require(".."));
var _1 = __importDefault(require("../"));
__1["default"].a;
_1["default"].aIndex;
