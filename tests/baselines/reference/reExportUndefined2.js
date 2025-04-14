//// [tests/cases/compiler/reExportUndefined2.ts] ////

//// [a.ts]
var undefined;
export { undefined };

//// [b.ts]
import { undefined } from "./a";
declare function use(a: number);
use(undefined);

//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.undefined = void 0;
var undefined;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a_1 = require("./a");
use(a_1.undefined);
