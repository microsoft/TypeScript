//// [tests/cases/compiler/moduleResolutionWithSuffixes_one_jsModule.ts] ////

//// [index.ts]
import { ios } from "./foo.js";
//// [foo.ios.js]
"use strict";
exports.__esModule = true;
function ios() {}
exports.ios = ios;
//// [foo.js]
"use strict";
exports.__esModule = true;
function base() {}
exports.base = base;


//// [/bin/foo.ios.js]
"use strict";
exports.__esModule = true;
function ios() { }
exports.ios = ios;
//// [/bin/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [/bin/foo.js]
"use strict";
exports.__esModule = true;
function base() { }
exports.base = base;
