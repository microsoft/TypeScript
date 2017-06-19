//// [parserParameterList10.ts]
class C {
   foo(...bar = 0) { }
}

//// [parserParameterList10.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var bar = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bar[_i] = arguments[_i];
        }
    };
    return C;
}());
