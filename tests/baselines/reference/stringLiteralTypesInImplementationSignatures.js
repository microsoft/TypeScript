//// [stringLiteralTypesInImplementationSignatures.js]
// String literal types are only valid in overload signatures
function foo(x) {
}
var f = function foo(x) {
};
var f2 = function (x, y) {
};

var C = (function () {
    function C() {
    }
    C.prototype.foo = function (x) {
    };
    return C;
})();

var a;

var b = {
    foo: function (x) {
    },
    a: function foo(x, y) {
    },
    b: function (x) {
    }
};
