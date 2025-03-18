//// [tests/cases/compiler/unusedImports10.ts] ////

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
    class Calculator {
        handelChar() {
        }
    }
    A.Calculator = Calculator;
})(A || (A = {}));
