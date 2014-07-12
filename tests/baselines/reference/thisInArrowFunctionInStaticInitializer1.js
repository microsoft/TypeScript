//// [thisInArrowFunctionInStaticInitializer1.js]
function log(a) {
}

var Vector = (function () {
    function Vector() {
        var _this = this;
    }
    Vector.foo = function () {
        // 'this' should not be available in a static initializer.
        log(_this);
    };
    return Vector;
})();
