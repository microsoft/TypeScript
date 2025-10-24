//// [tests/cases/compiler/declarationEmitOfTypeofAliasedExport.ts] ////

//// [a.ts]
class C {}
export { C as D }

//// [b.ts]
import * as a from "./a";
export default a.D;


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.D = void 0;
class C {
}
exports.D = C;
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const a = require("./a");
exports.default = a.D;


//// [a.d.ts]
declare class C {
}
export { C as D };
//// [b.d.ts]
import * as a from "./a";
declare const _default: typeof a.D;
export default _default;
