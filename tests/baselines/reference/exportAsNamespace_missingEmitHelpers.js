//// [tests/cases/conformance/es2020/modules/exportAsNamespace_missingEmitHelpers.ts] ////

//// [a.ts]
export {}

//// [b.ts]
export * as ns from './a'; // Error


//// [a.js]
"use strict";
exports.__esModule = true;
//// [b.js]
"use strict";
exports.__esModule = true;
exports.ns = require("./a"); // Error
