//// [parserParameterList9.ts]
class C {
   foo(...bar?) { }
}

//// [parserParameterList9.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var bar = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bar[_i - 0] = arguments[_i];
        }
    };
    return C;
}());
