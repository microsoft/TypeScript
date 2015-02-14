//// [parserParameterList10.ts]
class C {
   foo(...bar = 0) { }
}

//// [parserParameterList10.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
})();
