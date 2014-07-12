//// [genericTypeReferencesRequireTypeArgs.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        return null;
    };
    return C;
})();

var c1;
var i1;
var c2;
var i2;
