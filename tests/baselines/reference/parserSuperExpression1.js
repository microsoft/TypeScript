//// [tests/cases/conformance/parser/ecmascript5/SuperExpressions/parserSuperExpression1.ts] ////

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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        _super.prototype.foo.call(this);
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
                _super.prototype.foo.call(this);
            };
            return C;
        }());
    })(M2 = M1.M2 || (M1.M2 = {}));
})(M1 || (M1 = {}));
