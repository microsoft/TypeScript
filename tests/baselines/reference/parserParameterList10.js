//// [parserParameterList10.ts]
class C {
   foo(...bar = 0) { }
}

//// [parserParameterList10.js]
var C = (function () {
    function C() {
    }
    var proto_1 = C.prototype;
    proto_1.foo = function () {
        var bar = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bar[_i] = arguments[_i];
        }
    };
    return C;
}());
