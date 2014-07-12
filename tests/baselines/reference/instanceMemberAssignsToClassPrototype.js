//// [instanceMemberAssignsToClassPrototype.js]
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        C.prototype.foo = function () {
        };
    };

    C.prototype.bar = function (x) {
        C.prototype.bar = function () {
        };
        C.prototype.bar = function (x) {
            return x;
        }; // ok
        C.prototype.bar = function (x) {
            return 1;
        }; // ok
        return 1;
    };
    return C;
})();
