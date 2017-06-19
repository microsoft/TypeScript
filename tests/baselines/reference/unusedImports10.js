//// [unusedImports10.ts]
module A {
    export class Calculator {
        public handelChar() {
        }
    }
}

module B {
    import a = A;
}

//// [unusedImports10.js]
var A;
(function (A) {
    var Calculator = /** @class */ (function () {
        function Calculator() {
        }
        Calculator.prototype.handelChar = function () {
        };
        return Calculator;
    }());
    A.Calculator = Calculator;
})(A || (A = {}));
