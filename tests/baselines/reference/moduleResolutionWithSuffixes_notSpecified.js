//// [tests/cases/compiler/moduleResolutionWithSuffixes_notSpecified.ts] ////

//// [index.ts]
import { base } from "./foo";
//// [foo.ts]
export function base() {}


//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
function base() { }
exports.base = base;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
