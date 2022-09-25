//// [tests/cases/compiler/moduleResolutionWithSuffixes_threeLastIsBlank3.ts] ////

//// [index.ts]
import { base } from "./foo";
//// [foo.ts]
export function base() {}


//// [foo.js]
"use strict";
exports.__esModule = true;
exports.base = void 0;
function base() { }
exports.base = base;
//// [index.js]
"use strict";
exports.__esModule = true;
