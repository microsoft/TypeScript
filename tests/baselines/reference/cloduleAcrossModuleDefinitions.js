//// [tests/cases/compiler/cloduleAcrossModuleDefinitions.ts] ////

//// [cloduleAcrossModuleDefinitions.ts]
namespace A {
    export class B {
        foo() { }
        static bar() { }
    }
}

namespace A {
    export namespace B {
        export var x = 1;
    }
}

var b: A.B; // ok


//// [cloduleAcrossModuleDefinitions.js]
"use strict";
var A;
(function (A) {
    class B {
        foo() { }
        static bar() { }
    }
    A.B = B;
})(A || (A = {}));
(function (A) {
    let B;
    (function (B) {
        B.x = 1;
    })(B = A.B || (A.B = {}));
})(A || (A = {}));
var b; // ok
