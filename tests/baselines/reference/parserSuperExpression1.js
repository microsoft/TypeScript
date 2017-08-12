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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        _super.prototype.foo.call(this);
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
var M1;
(function (M1) {
    var M2;
    (function (M2) {
        var C = (function () {
            function C() {
            }
            C.prototype.foo = function () {
                _super.prototype.foo.call(this);
            };
            __names(C.prototype, ["foo"]);
            return C;
        }());
    })(M2 = M1.M2 || (M1.M2 = {}));
})(M1 || (M1 = {}));
