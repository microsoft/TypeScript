//// [tests/cases/compiler/unusedClassesinModule1.ts] ////

//// [unusedClassesinModule1.ts]
namespace A {
    class Calculator {
        public handelChar() {
        }
    }
}

//// [unusedClassesinModule1.js]
"use strict";
var A;
(function (A) {
    var Calculator = /** @class */ (function () {
        function Calculator() {
        }
        Calculator.prototype.handelChar = function () {
        };
        return Calculator;
    }());
})(A || (A = {}));
