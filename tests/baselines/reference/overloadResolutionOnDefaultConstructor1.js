//// [overloadResolutionOnDefaultConstructor1.js]
var Bar = (function () {
    function Bar() {
    }
    Bar.prototype.clone = function () {
        return new Bar(0);
    };
    return Bar;
})();
