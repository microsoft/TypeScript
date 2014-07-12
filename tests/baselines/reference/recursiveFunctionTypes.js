//// [recursiveFunctionTypes.js]
function fn() {
    return 1;
}

var x = fn;
var y = fn;

var f;
var g;

function f1(d) {
}

function f2() {
}
function g2() {
}

function f3() {
    return f3;
}

var a = f3;

var C = (function () {
    function C() {
    }
    C.g = function (t) {
    };
    return C;
})();
C.g(3); // error

var f4;
f4 = 3; // error

function f5() {
    return f5;
}

function f6(a) {
    return f6;
}

f6("", 3); // error (arity mismatch)
f6(""); // ok (function takes an any param)
f6(); // ok

f7("", 3); // error (arity mismatch)
f7(""); // ok (function takes an any param)
f7(); // ok
