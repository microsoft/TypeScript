//// [incrementOnTypeParameter.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        this.a++;
        for (var i, j = 0; j < 10; i++) {
        }
    };
    return C;
})();
