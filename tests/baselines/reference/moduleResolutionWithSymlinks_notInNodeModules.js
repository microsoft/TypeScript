//// [tests/cases/compiler/moduleResolutionWithSymlinks_notInNodeModules.ts] ////

//// [abc.ts]
export const x = 0;

//// [app.ts]
import { x } from "./shared/abc";
import { x as x2 } from "./shared2/abc";
x + x2;


//// [/src/bin/shared/abc.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 0;
//// [/src/bin/shared2/abc.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 0;
//// [/src/bin/app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var abc_1 = require("./shared/abc");
var abc_2 = require("./shared2/abc");
abc_1.x + abc_2.x;
