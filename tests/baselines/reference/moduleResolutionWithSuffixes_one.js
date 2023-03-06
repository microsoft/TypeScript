//// [tests/cases/compiler/moduleResolutionWithSuffixes_one.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [foo.ios.ts]
export function ios() {}
//// [foo.ts]
export function base() {}


//// [foo.ios.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ios = void 0;
function ios() { }
exports.ios = ios;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
function base() { }
exports.base = base;
