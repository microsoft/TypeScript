//// [tests/cases/compiler/moduleResolutionWithSuffixes_oneNotFound.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [foo.ts]
export function base() {}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = base;
function base() { }
