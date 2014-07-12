//// [constructorImplementationWithDefaultValues2.js]
var C = (function () {
    function C(x) {
        if (typeof x === "undefined") { x = 1; }
        this.x = x;
        var y = x;
    }
    return C;
})();

var D = (function () {
    function D(x, y) {
        if (typeof x === "undefined") { x = 1; }
        if (typeof y === "undefined") { y = x; }
        this.y = y;
        var z = x;
    }
    return D;
})();

var E = (function () {
    function E(x) {
        if (typeof x === "undefined") { x = new Date(); }
        var y = x;
    }
    return E;
})();
