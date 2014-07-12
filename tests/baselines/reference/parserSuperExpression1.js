//// [parserSuperExpression1.ts]
class C {
    private foo() {
        super.foo();
    }
}

module M1.M2 {
    class C {
        private foo() {
            super.foo();
        }
    }
}

//// [parserSuperExpression1.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        super.foo.call(this);
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
                super.foo.call(this);
            };
            return C;
        })();
    })(M1.M2 || (M1.M2 = {}));
    var M2 = M1.M2;
})(M1 || (M1 = {}));
