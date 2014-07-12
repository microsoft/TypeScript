//// [constructorDefaultValuesReferencingThis.js]
var C = (function () {
    function C(x) {
        if (typeof x === "undefined") { x = this; }
    }
    return C;
})();

var D = (function () {
    function D(x) {
        if (typeof x === "undefined") { x = this; }
    }
    return D;
})();

var E = (function () {
    function E(x) {
        if (typeof x === "undefined") { x = this; }
        this.x = x;
    }
    return E;
})();
