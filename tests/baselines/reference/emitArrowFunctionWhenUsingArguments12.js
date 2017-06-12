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
    var proto_1 = C.prototype;
    proto_1.f = function (arguments) {
        var a = function () { return arguments; };
    };
    return C;
}());
