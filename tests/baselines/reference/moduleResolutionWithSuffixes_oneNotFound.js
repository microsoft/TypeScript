//// [tests/cases/compiler/moduleResolutionWithSuffixes_oneNotFound.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [foo.ts]
export function base() {}


//// [index.js]
"use strict";
exports.__esModule = true;
//// [foo.js]
"use strict";
exports.__esModule = true;
exports.base = void 0;
function base() { }
exports.base = base;
