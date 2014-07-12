//// [interfaceWithPropertyThatIsPrivateInBaseType2.js]
var Base = (function () {
    function Base() {
    }
    Base.prototype.x = function () {
    };
    return Base;
})();

var Base2 = (function () {
    function Base2() {
    }
    Base2.prototype.x = function () {
    };
    return Base2;
})();
