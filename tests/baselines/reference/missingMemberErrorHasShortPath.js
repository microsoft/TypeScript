//// [tests/cases/compiler/missingMemberErrorHasShortPath.ts] ////

//// [utils.ts]
export function exist() {}
//// [sample.ts]
import { exit } from "./utils.js";

exit()

//// [utils.js]
"use strict";
exports.__esModule = true;
exports.exist = void 0;
function exist() { }
exports.exist = exist;
//// [sample.js]
"use strict";
exports.__esModule = true;
var utils_js_1 = require("./utils.js");
(0, utils_js_1.exit)();
