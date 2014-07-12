//// [tooManyTypeParameters1.js]
function f() {
}
f();

var x = function () {
};
x();

var C = (function () {
    function C() {
    }
    return C;
})();
var c = new C();

var i;
