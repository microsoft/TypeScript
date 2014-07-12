//// [moduleClassArrayCodeGenTest.js]
// Invalid code gen for Array of Module class
var M;
(function (M) {
    var A = (function () {
        function A() {
        }
        return A;
    })();
    M.A = A;
    var B = (function () {
        function B() {
        }
        return B;
    })();
})(M || (M = {}));

var t = [];
var t2 = [];
