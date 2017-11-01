//// [tests/cases/compiler/declarationEmitTypeofDefaultExport.ts] ////

//// [a.ts]
export default class C {};

//// [b.ts]
import * as a from "./a";
export default a.default;


//// [a.js]
"use strict";
exports.__esModule = true;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports["default"] = C;
;
//// [b.js]
"use strict";
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var a = __importStar(require("./a"));
exports["default"] = a["default"];


//// [a.d.ts]
export default class C {
}
//// [b.d.ts]
import * as a from "./a";
declare const _default: typeof a.default;
export default _default;
