//// [assignmentCompatWithOverloads.js]
function f1(x) {
    return null;
}

function f2(x) {
    return null;
}

function f3(x) {
    return null;
}

function f4(x) {
    return undefined;
}

var g;

g = f1; // OK

g = f2; // Error

g = f3; // Error

g = f4; // Error

var C = (function () {
    function C(x) {
    }
    return C;
})();

var d;

d = C; // Error
