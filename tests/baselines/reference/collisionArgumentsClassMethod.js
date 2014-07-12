//// [collisionArgumentsClassMethod.js]
var c1 = (function () {
    function c1() {
    }
    c1.prototype.foo = function (i) {
        var arguments = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            arguments[_i] = arguments[_i + 1];
        }
        var arguments;
    };
    c1.prototype.foo1 = function (arguments) {
        var rest = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            rest[_i] = arguments[_i + 1];
        }
        var arguments = 10;
    };
    c1.prototype.fooNoError = function (arguments) {
        var arguments = 10;
    };

    c1.prototype.f4 = function (i) {
        var arguments = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            arguments[_i] = arguments[_i + 1];
        }
        var arguments;
    };

    c1.prototype.f41 = function (arguments) {
        var rest = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            rest[_i] = arguments[_i + 1];
        }
        var arguments;
    };

    c1.prototype.f4NoError = function (arguments) {
        var arguments;
    };
    return c1;
})();

var c3 = (function () {
    function c3() {
    }
    c3.prototype.foo = function () {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            restParameters[_i] = arguments[_i + 0];
        }
        var arguments = 10;
    };
    c3.prototype.fooNoError = function () {
        var arguments = 10;
    };
    return c3;
})();
