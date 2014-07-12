//// [superCallInConstructorWithNoBaseType.js]
var C = (function () {
    function C() {
        _super.call(this); // error
    }
    return C;
})();

var D = (function () {
    function D(x) {
        this.x = x;
        _super.call(this); // error
    }
    return D;
})();
