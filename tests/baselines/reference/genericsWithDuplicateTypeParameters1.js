//// [genericsWithDuplicateTypeParameters1.js]
function f() {
}
function f2(a, b) {
    return null;
}
var C = (function () {
    function C() {
    }
    C.prototype.f = function () {
    };
    C.prototype.f2 = function (a, b) {
        return null;
    };
    return C;
})();

var m = {
    a: function f() {
    },
    b: function f2(a, b) {
        return null;
    }
};
