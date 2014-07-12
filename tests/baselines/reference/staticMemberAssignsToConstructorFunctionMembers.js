//// [staticMemberAssignsToConstructorFunctionMembers.js]
var C = (function () {
    function C() {
    }
    C.foo = function () {
        C.foo = function () {
        };
    };

    C.bar = function (x) {
        C.bar = function () {
        };
        C.bar = function (x) {
            return x;
        }; // ok
        C.bar = function (x) {
            return 1;
        }; // ok
        return 1;
    };
    return C;
})();
