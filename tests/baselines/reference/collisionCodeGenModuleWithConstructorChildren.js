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
    var c = /** @class */ (function () {
        function c(M, p) {
            if (p === void 0) { p = M_1.x; }
        }
        return c;
    }());
})(M || (M = {}));
(function (M_2) {
    var d = /** @class */ (function () {
        function d(M, p) {
            if (p === void 0) { p = M_2.x; }
            this.M = M;
        }
        return d;
    }());
})(M || (M = {}));
(function (M_3) {
    var d2 = /** @class */ (function () {
        function d2() {
            var M = 10;
            var p = M_3.x;
        }
        return d2;
    }());
})(M || (M = {}));
