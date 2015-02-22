//// [parserParameterList9.ts]
class C {
   foo(...bar?) { }
}

//// [parserParameterList9.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
})();
