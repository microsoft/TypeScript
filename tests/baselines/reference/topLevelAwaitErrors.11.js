//// [tests/cases/conformance/externalModules/topLevelAwaitErrors.11.ts] ////

//// [index.ts]
// await disallowed in import=
declare var require: any;
import await = require("./other");

//// [other.ts]
declare const _await: any;
export { _await as await };


//// [other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.await = void 0;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
