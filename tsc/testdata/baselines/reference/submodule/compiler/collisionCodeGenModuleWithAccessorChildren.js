//// [tests/cases/compiler/collisionCodeGenModuleWithAccessorChildren.ts] ////

//// [collisionCodeGenModuleWithAccessorChildren.ts]
module M {
    export var x = 3;
    class c {
        private y;
        set Z(M) {
            this.y = x;
        }
    }
}

module M {
    class d {
        private y;
        set Z(p) {
            var M = 10;
            this.y = x;
        }
    }
}

module M { // Shouldnt be _M
    class e {
        private y;
        set M(p) {
            this.y = x;
        }
    }
}

module M {
    class f {
        get Z() {
            var M = 10;
            return x;
        }
    }
}

module M { // Shouldnt be _M
    class e {
        get M() {
            return x;
        }
    }
}

//// [collisionCodeGenModuleWithAccessorChildren.js]
var M;
(function (M_1) {
    M_1.x = 3;
    class c {
        y;
        set Z(M) {
            this.y = M_1.x;
        }
    }
})(M || (M = {}));
(function (M_1) {
    class d {
        y;
        set Z(p) {
            var M = 10;
            this.y = x;
        }
    }
})(M || (M = {}));
(function (M) {
    class e {
        y;
        set M(p) {
            this.y = x;
        }
    }
})(M || (M = {}));
(function (M_1) {
    class f {
        get Z() {
            var M = 10;
            return x;
        }
    }
})(M || (M = {}));
(function (M) {
    class e {
        get M() {
            return x;
        }
    }
})(M || (M = {}));
