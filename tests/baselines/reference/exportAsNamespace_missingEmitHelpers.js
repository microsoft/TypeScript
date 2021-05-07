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
exports.ns = void 0;
var tslib_1 = require("tslib");
exports.ns = (0, tslib_1.__importStar)(require("./a")); // Error
