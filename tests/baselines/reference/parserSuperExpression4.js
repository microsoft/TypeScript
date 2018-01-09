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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        _super.prototype.foo = 1;
    };
    return C;
}());
var M1;
(function (M1) {
    var M2;
    (function (M2) {
        var C = /** @class */ (function () {
            function C() {
            }
            C.prototype.foo = function () {
                _super.prototype.foo = 1;
            };
            return C;
        }());
    })(M2 = M1.M2 || (M1.M2 = {}));
})(M1 || (M1 = {}));
