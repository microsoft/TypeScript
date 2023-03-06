//// [tests/cases/compiler/moduleResolutionWithSuffixes_threeLastIsBlank1.ts] ////

//// [index.ts]
import { ios } from "./foo";
//// [foo-ios.ts]
export function ios() {}
//// [foo__native.ts]
export function native() {}
//// [foo.ts]
export function base() {}


//// [foo-ios.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ios = void 0;
function ios() { }
exports.ios = ios;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [foo__native.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.native = void 0;
function native() { }
exports.native = native;
//// [foo.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base = void 0;
function base() { }
exports.base = base;
