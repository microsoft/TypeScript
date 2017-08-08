//// [emitArrowFunctionWhenUsingArguments12.ts]
class C {
    f(arguments) {
        var a = () => arguments;
    }
}

//// [emitArrowFunctionWhenUsingArguments12.js]
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
    C.prototype.f = function (arguments) {
        var a = function () { return arguments; };
    };
    __names(C.prototype, ["f"]);
    return C;
}());
