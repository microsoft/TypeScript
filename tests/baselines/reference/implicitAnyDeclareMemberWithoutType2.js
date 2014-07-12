//// [implicitAnyDeclareMemberWithoutType2.js]
// this should be an error
var C = (function () {
    function C(c1, c2, c3) {
        this.x = null;
    }
    C.prototype.funcOfC = function (f1, f2, f3) {
    };
    return C;
})();
