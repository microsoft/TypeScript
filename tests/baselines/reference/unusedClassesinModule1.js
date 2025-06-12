//// [tests/cases/compiler/unusedClassesinModule1.ts] ////

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
    class Calculator {
        handelChar() {
        }
    }
})(A || (A = {}));
