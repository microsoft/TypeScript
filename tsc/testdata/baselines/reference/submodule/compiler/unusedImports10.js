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
"use strict";
var A;
(function (A) {
    class Calculator {
        handelChar() {
        }
    }
    A.Calculator = Calculator;
})(A || (A = {}));
