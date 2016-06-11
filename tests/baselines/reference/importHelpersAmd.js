//// [tests/cases/compiler/importHelpersAmd.ts] ////

//// [a.ts]
export class A { }
//// [b.ts]
import { A } from "./a";
export class B extends A { }


//// [a.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    var A = (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
});
//// [b.js]
define(["require", "exports", "tslib", "./a"], function (require, exports, tslib_1, a_1) {
    "use strict";
    var B = (function (_super) {
        tslib_1.__extends(B, _super);
        function B() {
            _super.apply(this, arguments);
        }
        return B;
    }(a_1.A));
    exports.B = B;
});
