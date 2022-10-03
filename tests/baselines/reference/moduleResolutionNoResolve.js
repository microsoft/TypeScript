//// [tests/cases/compiler/moduleResolutionNoResolve.ts] ////

//// [a.ts]
import a = require('./b');

//// [b.ts]
export var c = '';


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
exports.c = void 0;
exports.c = '';
