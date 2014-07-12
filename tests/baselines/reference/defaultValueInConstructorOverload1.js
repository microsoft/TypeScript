//// [defaultValueInConstructorOverload1.js]
var C = (function () {
    function C(x) {
        if (typeof x === "undefined") { x = ''; }
    }
    return C;
})();
