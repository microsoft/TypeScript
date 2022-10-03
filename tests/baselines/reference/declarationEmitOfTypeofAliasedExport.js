//// [tests/cases/compiler/declarationEmitOfTypeofAliasedExport.ts] ////

//// [a.ts]
class C {}
export { C as D }

//// [b.ts]
import * as a from "./a";
export default a.D;


//// [a.js]
"use strict";
exports.__esModule = true;
exports.D = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.D = C;
//// [b.js]
"use strict";
exports.__esModule = true;
var a = require("./a");
exports["default"] = a.D;


//// [a.d.ts]
declare class C {
}
export { C as D };
//// [b.d.ts]
import * as a from "./a";
declare const _default: typeof a.D;
export default _default;
