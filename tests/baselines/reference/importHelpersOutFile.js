//// [tests/cases/compiler/importHelpersOutFile.ts] ////

//// [a.ts]
export class A { }
//// [b.ts]
import { A } from "./a";
export class B extends A { }
//// [c.ts]
import { A } from "./a";
export class C extends A { }


//// [out.js]
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    var A = (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
});
define("b", ["require", "exports", "tslib", "a"], function (require, exports, tslib_1, a_1) {
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
define("c", ["require", "exports", "tslib", "a"], function (require, exports, tslib_2, a_2) {
    "use strict";
    var C = (function (_super) {
        tslib_2.__extends(C, _super);
        function C() {
            _super.apply(this, arguments);
        }
        return C;
    }(a_2.A));
    exports.C = C;
});
