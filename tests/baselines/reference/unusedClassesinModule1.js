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
        Calculator.prototype.handelChar = function () {
        };
        return Calculator;
    }());
})(A || (A = {}));
