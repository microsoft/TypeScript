//// [foo_2.ts]
import foo = require("./foo_1");
var x = foo; // Cause a runtime dependency


//// [foo_0.js]
define(["require", "exports"], function(require, exports) {
    var C1 = (function () {
        function C1() {
            this.m1 = 42;
        }
        C1.s1 = true;
        return C1;
    })();
    exports.C1 = C1;
});
//// [foo_1.js]
define(["require", "exports"], function(require, exports) {
    var answer = 42;
});
//// [foo_2.js]
define(["require", "exports", "./foo_1"], function(require, exports, foo) {
    var x = foo;
});
