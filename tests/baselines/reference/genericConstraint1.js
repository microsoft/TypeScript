//// [genericConstraint1.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar2 = function (x, y) {
        return null;
    };
    return C;
})();

var x = new C();
x.bar2(2, "");
