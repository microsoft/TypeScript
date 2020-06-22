//// [parserParameterList10.ts]
class C {
   foo(...bar = 0) { }
}

//// [parserParameterList10.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
}());
