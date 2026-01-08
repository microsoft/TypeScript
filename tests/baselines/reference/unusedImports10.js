//// [tests/cases/compiler/unusedImports10.ts] ////

//// [unusedImports10.ts]
namespace A {
    export class Calculator {
        public handelChar() {
        }
    }
}

namespace B {
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
