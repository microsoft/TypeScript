//// [tests/cases/compiler/collisionCodeGenModuleWithAccessorChildren.ts] ////

//// [collisionCodeGenModuleWithAccessorChildren.ts]
namespace M {
    export var x = 3;
    class c {
        private y;
        set Z(M) {
            this.y = x;
        }
    }
}

namespace M {
    class d {
        private y;
        set Z(p) {
            var M = 10;
            this.y = x;
        }
    }
}

namespace M { // Shouldnt be _M
    class e {
        private y;
        set M(p) {
            this.y = x;
        }
    }
}

namespace M {
    class f {
        get Z() {
            var M = 10;
            return x;
        }
    }
}

namespace M { // Shouldnt be _M
    class e {
        get M() {
            return x;
        }
    }
}

//// [collisionCodeGenModuleWithAccessorChildren.js]
"use strict";
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
(function (M_2) {
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
(function (M_3) {
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
