//// [constructorParameterProperties.js]
var C = (function () {
    function C(x) {
        this.x = x;
    }
    return C;
})();

var c;
var r = c.y;
var r2 = c.x;

var D = (function () {
    function D(a, x) {
        this.x = x;
    }
    return D;
})();

var d;
var r = d.y;
var r2 = d.x;
var r3 = d.a; // error
