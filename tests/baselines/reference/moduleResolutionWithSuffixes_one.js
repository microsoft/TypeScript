//// [tests/cases/compiler/moduleResolutionWithSuffixes_one.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [foo.ios.ts]
export function ios() {}
//// [foo.ts]
export function base() {}


//// [foo.ios.js]
"use strict";
exports.__esModule = true;
exports.ios = void 0;
function ios() { }
exports.ios = ios;
//// [index.js]
"use strict";
exports.__esModule = true;
//// [foo.js]
"use strict";
exports.__esModule = true;
exports.base = void 0;
function base() { }
exports.base = base;
