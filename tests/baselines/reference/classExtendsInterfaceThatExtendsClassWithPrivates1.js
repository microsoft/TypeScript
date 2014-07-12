//// [classExtendsInterfaceThatExtendsClassWithPrivates1.js]
var C = (function () {
    function C() {
        this.x = 1;
    }
    C.prototype.foo = function (x) {
        return x;
    };
    return C;
})();

var D2 = (function () {
    function D2() {
        this.x = 3;
    }
    D2.prototype.foo = function (x) {
        return x;
    };

    D2.prototype.other = function (x) {
        return x;
    };
    return D2;
})();
