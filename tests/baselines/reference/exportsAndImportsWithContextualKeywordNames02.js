//// [tests/cases/conformance/es6/modules/exportsAndImportsWithContextualKeywordNames02.ts] ////

//// [t1.ts]

let as = 100;

export { as as return, as };

//// [t2.ts]
import * as as from "./t1";
var x = as.as;
var y = as.return;

//// [t3.ts]
import { as as as } from "./t1";

//// [t4.ts]
import { as } from "./t1";

//// [t1.js]
"use strict";
var as = 100;
exports.return = as;
exports.as = as;
//// [t2.js]
"use strict";
var as = require("./t1");
var x = as.as;
var y = as.return;
//// [t3.js]
"use strict";
//// [t4.js]
"use strict";
