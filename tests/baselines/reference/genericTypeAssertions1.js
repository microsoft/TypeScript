//// [genericTypeAssertions1.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function (x) {
    };
    return A;
})();
var foo = new A();
var r = new A();
var r2 = foo; // error
