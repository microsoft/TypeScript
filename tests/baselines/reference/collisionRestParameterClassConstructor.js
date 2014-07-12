//// [collisionRestParameterClassConstructor.js]
// Constructors
var c1 = (function () {
    function c1(_i) {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            restParameters[_i] = arguments[_i + 1];
        }
        var _i = 10;
    }
    return c1;
})();
var c1NoError = (function () {
    function c1NoError(_i) {
        var _i = 10;
    }
    return c1NoError;
})();

var c2 = (function () {
    function c2() {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            restParameters[_i] = arguments[_i + 0];
        }
        var _i = 10;
    }
    return c2;
})();
var c2NoError = (function () {
    function c2NoError() {
        var _i = 10;
    }
    return c2NoError;
})();

var c3 = (function () {
    function c3(_i) {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            restParameters[_i] = arguments[_i + 1];
        }
        this._i = _i;
        var _i = 10;
    }
    return c3;
})();
var c3NoError = (function () {
    function c3NoError(_i) {
        this._i = _i;
        var _i = 10;
    }
    return c3NoError;
})();

var c5 = (function () {
    function c5(_i) {
        var rest = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            rest[_i] = arguments[_i + 1];
        }
        var _i;
    }
    return c5;
})();

var c5NoError = (function () {
    function c5NoError(_i) {
        var _i;
    }
    return c5NoError;
})();
