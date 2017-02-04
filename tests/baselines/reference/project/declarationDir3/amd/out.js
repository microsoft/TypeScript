define("subfolder/b", ["require", "exports"], function (require, exports) {
    "use strict";
    var B = (function () {
        function B() {
        }
        return B;
    }());
    exports.B = B;
    exports.__esModule = true;
});
define("a", ["require", "exports"], function (require, exports) {
    "use strict";
    var A = (function () {
        function A() {
        }
        return A;
    }());
    exports.A = A;
    exports.__esModule = true;
});
define("subfolder/c", ["require", "exports"], function (require, exports) {
    "use strict";
    var C = (function () {
        function C() {
        }
        return C;
    }());
    exports.C = C;
    exports.__esModule = true;
});
