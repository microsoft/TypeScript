//// [recursiveInheritance3.js]
var C = (function () {
    function C() {
        this.x = 1;
    }
    C.prototype.foo = function (x) {
        return x;
    };
    return C;
})();
