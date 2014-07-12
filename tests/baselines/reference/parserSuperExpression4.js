//// [parserSuperExpression4.ts]
class C {
    private foo() {
        super.foo = 1
    }
}

module M1.M2 {
    class C {
        private foo() {
            super.foo = 1
        }
    }
}

//// [parserSuperExpression4.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        super.foo = 1;
    };
    return C;
})();
var M1;
(function (M1) {
    (function (M2) {
        var C = (function () {
            function C() {
            }
            C.prototype.foo = function () {
                super.foo = 1;
            };
            return C;
        })();
    })(M1.M2 || (M1.M2 = {}));
    var M2 = M1.M2;
})(M1 || (M1 = {}));
