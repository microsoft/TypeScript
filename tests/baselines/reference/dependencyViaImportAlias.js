//// [tests/cases/compiler/dependencyViaImportAlias.ts] ////

//// [A.ts]
export class A {
}
//// [B.ts]
import a = require('A');

import A = a.A;

export = A;

//// [A.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.A = void 0;
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
});
//// [B.js]
define(["require", "exports", "A"], function (require, exports, a) {
    "use strict";
    var A = a.A;
    return A;
});
