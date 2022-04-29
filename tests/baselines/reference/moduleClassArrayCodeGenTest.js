//// [moduleClassArrayCodeGenTest.ts]
// Invalid code gen for Array of Module class

module M
{
    export class A { }
    class B{ }
}

var t: M.A[] = [];
var t2: M.B[] = [];

//// [moduleClassArrayCodeGenTest.js]
// Invalid code gen for Array of Module class
var M;
(function (M) {
    var A = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    M.A = A;
    var B = /** @class */ (function () {
        function B() {
        }
        return B;
    }());
})(M || (M = {}));
var t = [];
var t2 = [];
