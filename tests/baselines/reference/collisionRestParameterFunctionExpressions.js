//// [collisionRestParameterFunctionExpressions.js]
function foo() {
    function f1(_i) {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            restParameters[_i] = arguments[_i + 1];
        }
        var _i = 10;
    }
    function f1NoError(_i) {
        var _i = 10;
    }
    function f3() {
        var restParameters = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            restParameters[_i] = arguments[_i + 0];
        }
        var _i = 10;
    }
    function f3NoError() {
        var _i = 10;
    }

    function f4(_i) {
        var rest = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            rest[_i] = arguments[_i + 1];
        }
    }

    function f4NoError(_i) {
    }
}
