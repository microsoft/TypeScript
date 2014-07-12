//// [staticInstanceResolution4.js]
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () {
    };
    return A;
})();

A.foo();
