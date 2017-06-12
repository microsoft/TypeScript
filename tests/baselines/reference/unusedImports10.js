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
    var Calculator = (function () {
        function Calculator() {
        }
        var proto_1 = Calculator.prototype;
        proto_1.handelChar = function () {
        };
        return Calculator;
    }());
    A.Calculator = Calculator;
})(A || (A = {}));
