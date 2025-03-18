//// [tests/cases/conformance/es2020/modules/exportAsNamespace_missingEmitHelpers.ts] ////

//// [a.ts]
export {}

//// [b.ts]
export * as ns from './a'; // Error


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ns = void 0;
const tslib_1 = require("tslib");
exports.ns = tslib_1.__importStar(require("./a"));
