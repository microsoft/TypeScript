//// [tests/cases/compiler/symlinkedPackageReachedRelativelyIsNotExternalLibrary.ts] ////

//// [package.json]
{ "name": "lib", "types": "index.ts" }

//// [index.ts]
export { util } from "./util";

//// [util.ts]
export const util = 1;

//// [a.ts]
import { util } from "./lib/index";
export const a = util;

//// [b.ts]
import { util } from "lib";
export const b = util;


//// [util.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = void 0;
exports.util = 1;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = void 0;
var util_1 = require("./util");
Object.defineProperty(exports, "util", { enumerable: true, get: function () { return util_1.util; } });
//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
const index_1 = require("./lib/index");
exports.a = index_1.util;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
const lib_1 = require("lib");
exports.b = lib_1.util;
