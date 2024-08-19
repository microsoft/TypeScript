//// [tests/cases/compiler/missingMemberErrorHasShortPath.ts] ////

//// [utils.ts]
export function exist() {}
//// [sample.ts]
import { exit } from "./utils.js";

exit()

//// [utils.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exist = exist;
function exist() { }
//// [sample.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_js_1 = require("./utils.js");
(0, utils_js_1.exit)();
