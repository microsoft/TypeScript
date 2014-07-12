//// [genericWithOpenTypeParameters1.js]
var B = (function () {
    function B() {
    }
    B.prototype.foo = function (x) {
        return null;
    };
    return B;
})();

var x;
x.foo(1); // no error
var f = function (x) {
    return x.foo(1);
};
var f2 = function (x) {
    return x.foo(1);
};
var f3 = function (x) {
    return x.foo(1);
};
var f4 = function (x) {
    return x.foo(1);
};
