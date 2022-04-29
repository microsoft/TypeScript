//// [tests/cases/conformance/externalModules/invalidSyntaxNamespaceImportWithCommonjs.ts] ////

//// [0.ts]
export class C { }

//// [1.ts]
import * from Zero from "./0"

//// [0.js]
"use strict";
exports.__esModule = true;
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [1.js]
"use strict";
exports.__esModule = true;
var from = require();
from;
"./0";
