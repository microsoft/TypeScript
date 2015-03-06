//// [parserParameterList10.ts]
class C {
   foo(...bar = 0) { }
}

//// [parserParameterList10.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        if (bar === void 0) { bar = 0; }
        var bar = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            bar[_i - 0] = arguments[_i];
        }
    };
    return C;
})();
