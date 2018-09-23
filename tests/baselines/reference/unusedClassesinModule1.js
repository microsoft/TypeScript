//// [unusedClassesinModule1.ts]
module A {
    class Calculator {
        public handelChar() {
        }
    }
}

//// [unusedClassesinModule1.js]
var A = A || (A = {});
(function (A) {
    var Calculator = /** @class */ (function () {
        function Calculator() {
        }
        Calculator.prototype.handelChar = function () {
        };
        return Calculator;
    }());
})(A);
