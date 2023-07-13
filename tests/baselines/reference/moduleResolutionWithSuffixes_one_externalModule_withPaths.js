//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_externalModule_withPaths.ts] ////

//// [index.ios.js]
"use strict";
exports.__esModule = true;
function ios() {}
exports.ios = ios;
//// [index.ios.d.ts]
export declare function ios(): void;
//// [index.js]
"use strict";
exports.__esModule = true;
function base() {}
exports.base = base;
//// [index.d.ts]
export declare function base(): void;

//// [test.ts]
import { ios } from "some-library";
import { ios as ios2 } from "some-library/index";
import { ios as ios3 } from "some-library/index.js";


//// [/bin/test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
