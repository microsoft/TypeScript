//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_dirModuleWithIndex.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [index.ios.ts]
export function ios() {}
//// [index.ts]
export function base() {}

//// [index.ios.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ios = ios;
function ios() { }
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = base;
function base() { }
