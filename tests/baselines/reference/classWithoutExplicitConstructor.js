//// [classWithoutExplicitConstructor.js]
var C = (function () {
    function C() {
        this.x = 1;
        this.y = 'hello';
    }
    return C;
})();

var c = new C();
var c2 = new C(null);

var D = (function () {
    function D() {
        this.x = 2;
        this.y = null;
    }
    return D;
})();

var d = new D();
var d2 = new D(null); // error
