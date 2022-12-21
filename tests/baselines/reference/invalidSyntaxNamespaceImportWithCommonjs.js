//// [tests/cases/conformance/externalModules/invalidSyntaxNamespaceImportWithCommonjs.ts] ////

//// [0.ts]
export class C { }

//// [1.ts]
import * from Zero from "./0"

//// [0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
//// [1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var from = require();
from;
"./0";
