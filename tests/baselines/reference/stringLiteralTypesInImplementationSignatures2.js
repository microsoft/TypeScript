//// [stringLiteralTypesInImplementationSignatures2.js]
// String literal types are only valid in overload signatures
function foo(x) {
}

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
    foo: function (x) {
    }
};
