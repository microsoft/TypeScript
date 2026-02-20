//// [tests/cases/compiler/collisionCodeGenModuleWithConstructorChildren.ts] ////

//// [collisionCodeGenModuleWithConstructorChildren.ts]
namespace M {
    export var x = 3;
    class c {
        constructor(M, p = x) {
        }
    }
}

namespace M {
    class d {
        constructor(private M, p = x) {
        }
    }
}

namespace M {
    class d2 {
        constructor() {
            var M = 10;
            var p = x;
        }
    }
}

//// [collisionCodeGenModuleWithConstructorChildren.js]
"use strict";
var M;
(function (M_1) {
    M_1.x = 3;
    class c {
        constructor(M, p = M_1.x) {
        }
    }
})(M || (M = {}));
(function (M_2) {
    class d {
        M;
        constructor(M, p = M_2.x) {
            this.M = M;
        }
    }
})(M || (M = {}));
(function (M_3) {
    class d2 {
        constructor() {
            var M = 10;
            var p = M_3.x;
        }
    }
})(M || (M = {}));
