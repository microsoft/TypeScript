//// [tests/cases/compiler/moduleResolutionWithSuffixes_threeLastIsBlank2.ts] ////

//// [index.ts]
import { native } from "./foo";
//// [foo__native.ts]
export function native() {}
//// [foo.ts]
export function base() {}


//// [foo__native.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.native = void 0;
function native() { }
exports.native = native;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
function base() { }
exports.base = base;
