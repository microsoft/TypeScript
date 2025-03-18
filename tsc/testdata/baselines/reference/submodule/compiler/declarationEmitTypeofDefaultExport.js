//// [tests/cases/compiler/declarationEmitTypeofDefaultExport.ts] ////

//// [a.ts]
export default class C {};

//// [b.ts]
import * as a from "./a";
export default a.default;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class C {
}
exports.default = C;
;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = require("./a");
exports.default = a.default;
