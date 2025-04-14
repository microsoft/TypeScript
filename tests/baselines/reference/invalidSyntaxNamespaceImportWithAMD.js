//// [tests/cases/conformance/externalModules/invalidSyntaxNamespaceImportWithAMD.ts] ////

//// [0.ts]
export class C { }

//// [1.ts]
import * from Zero from "./0"

//// [0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.C = void 0;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    exports.C = C;
});
//// [1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    from;
    "./0";
});
