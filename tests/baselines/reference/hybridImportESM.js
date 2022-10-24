//// [tests/cases/conformance/moduleResolution/hybrid/hybridImportESM.ts] ////

//// [esm.mts]
export const esm = 0;

//// [not-actually-cjs.cts]
import { esm } from "./esm.mjs";

//// [package.json]
{ "type": "commonjs" }

//// [still-not-cjs.ts]
import { esm } from "./esm.mjs";


//// [esm.mjs]
"use strict";
exports.__esModule = true;
exports.esm = void 0;
exports.esm = 0;
//// [not-actually-cjs.cjs]
"use strict";
exports.__esModule = true;
//// [still-not-cjs.js]
"use strict";
exports.__esModule = true;
