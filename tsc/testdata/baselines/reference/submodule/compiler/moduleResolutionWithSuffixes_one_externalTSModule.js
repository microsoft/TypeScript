//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_externalTSModule.ts] ////

//// [index.ios.ts]
export function ios() {}
//// [index.ts]
export function base() {}
//// [test.ts]
import { ios } from "some-library";


//// [/bin/node_modules/some-library/index.ios.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ios = ios;
function ios() { }
//// [/bin/test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
