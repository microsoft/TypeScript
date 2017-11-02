//// [tests/cases/conformance/externalModules/invalidSyntaxNamespaceImportWithCommonjs.ts] ////

//// [0.ts]
export class C { }

//// [1.ts]
import * from Zero from "./0"

//// [0.js]
"use strict";
exports.__esModule = true;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [1.js]
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var from = __importStar(require());
from;
"./0";
