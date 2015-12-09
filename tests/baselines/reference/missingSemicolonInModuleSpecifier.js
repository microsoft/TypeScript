//// [tests/cases/compiler/missingSemicolonInModuleSpecifier.ts] ////

//// [a.ts]

export const x = 1;

//// [b.ts]
import {x} from "./a"
(function() { return 1; }())

//// [a.js]
"use strict";
exports.x = 1;
//// [b.js]
"use strict";
(function () { return 1; }());
