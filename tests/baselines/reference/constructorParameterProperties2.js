//// [constructorParameterProperties2.js]
var C = (function () {
    function C(y) {
    }
    return C;
})();

var c;
var r = c.y;

var D = (function () {
    function D(y) {
        this.y = y;
    }
    return D;
})();

var d;
var r2 = d.y;

var E = (function () {
    function E(y) {
        this.y = y;
    }
    return E;
})();

var e;
var r3 = e.y; // error
