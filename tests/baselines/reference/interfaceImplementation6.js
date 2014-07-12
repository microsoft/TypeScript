//// [interfaceImplementation6.js]
define(["require", "exports"], function(require, exports) {
    var C1 = (function () {
        function C1() {
        }
        return C1;
    })();

    var C2 = (function () {
        function C2() {
        }
        return C2;
    })();

    var C3 = (function () {
        function C3() {
            var item;
        }
        return C3;
    })();

    var Test = (function () {
        function Test() {
            this.pt = { item: 1 };
        }
        return Test;
    })();
    exports.Test = Test;
});
