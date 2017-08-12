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
    var proto_1 = C.prototype;
    proto_1.foo = function () {
        _super.prototype.foo = 1;
    };
    return C;
}());
var M1;
(function (M1) {
    var M2;
    (function (M2) {
        var C = (function () {
            function C() {
            }
            var proto_2 = C.prototype;
            proto_2.foo = function () {
                _super.prototype.foo = 1;
            };
            return C;
        }());
    })(M2 = M1.M2 || (M1.M2 = {}));
})(M1 || (M1 = {}));
