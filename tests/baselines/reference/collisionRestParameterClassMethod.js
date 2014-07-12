//// [collisionRestParameterClassMethod.js]
var c1 = (function () {
    function c1() {
    }
    c1.prototype.foo = function (_i) {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            restParameters[_i] = arguments[_i + 1];
        }
        var _i = 10;
    };
    c1.prototype.fooNoError = function (_i) {
        var _i = 10;
    };

    c1.prototype.f4 = function (_i) {
        var rest = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            rest[_i] = arguments[_i + 1];
        }
        var _i;
    };

    c1.prototype.f4NoError = function (_i) {
        var _i;
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
        var _i = 10;
    };
    c3.prototype.fooNoError = function () {
        var _i = 10;
    };
    return c3;
})();
