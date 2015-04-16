//// [emitArrowFunctionWhenUsingArguments12.ts]

class C {
    f(arguments) {
        var a = () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments12.js]
var C = (function () {
    function C() {
    }
    C.prototype.f = function (_arguments) {
        var a = function () { return _arguments; };
    };
    return C;
})();
