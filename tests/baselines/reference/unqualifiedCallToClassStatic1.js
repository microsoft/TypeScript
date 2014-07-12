//// [unqualifiedCallToClassStatic1.js]
var Vector = (function () {
    function Vector() {
    }
    Vector.foo = function () {
        // 'foo' cannot be called in an unqualified manner.
        foo();
    };
    return Vector;
})();
