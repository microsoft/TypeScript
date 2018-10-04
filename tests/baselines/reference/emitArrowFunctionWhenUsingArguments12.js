//// [emitArrowFunctionWhenUsingArguments12.ts]
class C {
    f(arguments) {
        var a = () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments12.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.f = function (arguments) {
        var a = function () { return arguments; };
    };
    return C;
}());
