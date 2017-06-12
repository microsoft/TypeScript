//// [unusedClassesinModule1.ts]
module A {
    class Calculator {
        public handelChar() {
        }
    }
}

//// [unusedClassesinModule1.js]
var A;
(function (A) {
    var Calculator = (function () {
        function Calculator() {
        }
        var proto_1 = Calculator.prototype;
        proto_1.handelChar = function () {
        };
        return Calculator;
    }());
})(A || (A = {}));
