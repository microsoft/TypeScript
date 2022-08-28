//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_externalTSModule.ts] ////

//// [index.ios.ts]
export function ios() {}
//// [index.ts]
export function base() {}
//// [test.ts]
import { ios } from "some-library";


//// [/bin/node_modules/some-library/index.ios.js]
"use strict";
exports.__esModule = true;
exports.ios = void 0;
function ios() { }
exports.ios = ios;
//// [/bin/node_modules/some-library/index.js]
"use strict";
exports.__esModule = true;
exports.base = void 0;
function base() { }
exports.base = base;
//// [/bin/test.js]
"use strict";
exports.__esModule = true;
