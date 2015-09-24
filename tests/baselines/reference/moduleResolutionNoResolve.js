//// [tests/cases/compiler/moduleResolutionNoResolve.ts] ////

//// [a.ts]

import a = require('./b');

//// [b.ts]
export var c = '';


//// [a.js]
//// [b.js]
exports.c = '';
