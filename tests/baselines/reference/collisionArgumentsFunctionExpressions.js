//// [collisionArgumentsFunctionExpressions.js]
function foo() {
    function f1(arguments) {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            restParameters[_i] = arguments[_i + 1];
        }
        var arguments = 10;
    }
    function f12(i) {
        var arguments = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            arguments[_i] = arguments[_i + 1];
        }
        var arguments;
    }
    function f1NoError(arguments) {
        var arguments = 10;
    }

    function f3() {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            restParameters[_i] = arguments[_i + 0];
        }
        var arguments = 10;
    }
    function f3NoError() {
        var arguments = 10;
    }

    function f4(arguments) {
        var rest = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            rest[_i] = arguments[_i + 1];
        }
        var arguments;
    }

    function f42(i) {
        var arguments = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            arguments[_i] = arguments[_i + 1];
        }
        var arguments;
    }

    function f4NoError(arguments) {
        var arguments;
    }
}
