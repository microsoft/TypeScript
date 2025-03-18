//// [tests/cases/compiler/collisionCodeGenModuleWithConstructorChildren.ts] ////

//// [collisionCodeGenModuleWithConstructorChildren.ts]
module M {
    export var x = 3;
    class c {
        constructor(M, p = x) {
        }
    }
}

module M {
    class d {
        constructor(private M, p = x) {
        }
    }
}

module M {
    class d2 {
        constructor() {
            var M = 10;
            var p = x;
        }
    }
}

//// [collisionCodeGenModuleWithConstructorChildren.js]
var M;
(function (M_1) {
    M_1.x = 3;
    class c {
        constructor(M, p = M_1.x) {
        }
    }
})(M || (M = {}));
(function (M_1) {
    class d {
        M;
        constructor(M, p = x) {
            this.M = M;
        }
    }
})(M || (M = {}));
(function (M_1) {
    class d2 {
        constructor() {
            var M = 10;
            var p = x;
        }
    }
})(M || (M = {}));
