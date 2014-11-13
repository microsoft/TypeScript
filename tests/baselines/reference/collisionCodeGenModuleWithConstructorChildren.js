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
        function c(M) {
            var p = (arguments[1] === void 0) ? _M.x : arguments[1];
        }
        return c;
    })();
})(M || (M = {}));
var M;
(function (_M) {
    var d = (function () {
        function d(M) {
            var p = (arguments[1] === void 0) ? _M.x : arguments[1];
            this.M = M;
        }
        return d;
    })();
})(M || (M = {}));
var M;
(function (_M) {
    var d2 = (function () {
        function d2() {
            var M = 10;
            var p = _M.x;
        }
        return d2;
    })();
})(M || (M = {}));
