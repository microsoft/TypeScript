//// [collisionArgumentsClassConstructor.js]
// Constructors
var c1 = (function () {
    function c1(i) {
        var arguments = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            arguments[_i] = arguments[_i + 1];
        }
        var arguments;
    }
    return c1;
})();
var c12 = (function () {
    function c12(arguments) {
        var rest = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            rest[_i] = arguments[_i + 1];
        }
        var arguments = 10;
    }
    return c12;
})();
var c1NoError = (function () {
    function c1NoError(arguments) {
        var arguments = 10;
    }
    return c1NoError;
})();

var c2 = (function () {
    function c2() {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            restParameters[_i] = arguments[_i + 0];
        }
        var arguments = 10;
    }
    return c2;
})();
var c2NoError = (function () {
    function c2NoError() {
        var arguments = 10;
    }
    return c2NoError;
})();

var c3 = (function () {
    function c3(arguments) {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            restParameters[_i] = arguments[_i + 1];
        }
        this.arguments = arguments;
        var arguments = 10;
    }
    return c3;
})();
var c3NoError = (function () {
    function c3NoError(arguments) {
        this.arguments = arguments;
        var arguments = 10;
    }
    return c3NoError;
})();

var c5 = (function () {
    function c5(i) {
        var arguments = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            arguments[_i] = arguments[_i + 1];
        }
        var arguments;
    }
    return c5;
})();

var c52 = (function () {
    function c52(arguments) {
        var rest = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            rest[_i] = arguments[_i + 1];
        }
        var arguments;
    }
    return c52;
})();

var c5NoError = (function () {
    function c5NoError(arguments) {
        var arguments;
    }
    return c5NoError;
})();
