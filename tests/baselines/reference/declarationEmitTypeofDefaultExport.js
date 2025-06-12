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
var a = require("./a");
exports.default = a.default;


//// [a.d.ts]
export default class C {
}
//// [b.d.ts]
import * as a from "./a";
declare const _default: typeof a.default;
export default _default;
