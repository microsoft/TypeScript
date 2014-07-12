//// [genericCallWithObjectTypeArgsAndConstraints5.js]
// Generic call with constraints infering type parameter from object member properties
var C = (function () {
    function C() {
    }
    return C;
})();

var D = (function () {
    function D() {
    }
    return D;
})();

function foo(t, t2) {
    return function (x) {
        return t2;
    };
}

var c;
var d;
var r2 = foo(d, c);
var r9 = foo(function () {
    return 1;
}, function () {
});

function other() {
    var r5 = foo(c, d);
}
