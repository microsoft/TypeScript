//// [typeParameterIndirectlyConstrainedToItself.js]
var C = (function () {
    function C() {
    }
    return C;
})();
var C2 = (function () {
    function C2() {
    }
    return C2;
})();

function f() {
}
function f2() {
}

var a;

var b = function () {
};
var b2 = function () {
};

var D = (function () {
    function D() {
    }
    return D;
})();
