//// [anyAssignableToEveryType2.js]
// any is not a subtype of any other types, but is assignable, all the below should work

var A = (function () {
    function A() {
    }
    return A;
})();

var A2 = (function () {
    function A2() {
    }
    return A2;
})();

var E;
(function (E) {
    E[E["A"] = 0] = "A";
})(E || (E = {}));

function f() {
}
var f;
(function (f) {
    f.bar = 1;
})(f || (f = {}));

var c = (function () {
    function c() {
    }
    return c;
})();
var c;
(function (c) {
    c.bar = 1;
})(c || (c = {}));
