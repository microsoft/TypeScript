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
(function (_M) {
    _M.x = 3;
    var c = (function () {
        function c(M, p) {
            if (p === void 0) { p = _M.x; }
        }
        return c;
    })();
})(M || (M = {}));
var M;
(function (_M_1) {
    var d = (function () {
        function d(M, p) {
            if (p === void 0) { p = _M_1.x; }
            this.M = M;
        }
        return d;
    })();
})(M || (M = {}));
var M;
(function (_M_2) {
    var d2 = (function () {
        function d2() {
            var M = 10;
            var p = _M_2.x;
        }
        return d2;
    })();
})(M || (M = {}));
