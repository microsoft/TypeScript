//// [defaultArgsForwardReferencing.js]
function left(a, b, c) {
    if (typeof b === "undefined") { b = a; }
    if (typeof c === "undefined") { c = b; }
    a;
    b;
}

function right(a, b) {
    if (typeof a === "undefined") { a = b; }
    if (typeof b === "undefined") { b = a; }
    a;
    b;
}

function right2(a, b, c) {
    if (typeof a === "undefined") { a = b; }
    if (typeof b === "undefined") { b = c; }
    if (typeof c === "undefined") { c = a; }
    a;
    b;
    c;
}

function inside(a) {
    if (typeof a === "undefined") { a = b; }
    var b;
}

function outside() {
    var b;
    function inside(a) {
        if (typeof a === "undefined") { a = b; }
        var b;
    }
}

function defaultArgFunction(a, b) {
    if (typeof a === "undefined") { a = function () {
        return b;
    }; }
    if (typeof b === "undefined") { b = 1; }
}
function defaultArgArrow(a, b) {
    if (typeof a === "undefined") { a = function () {
        return function () {
            return b;
        };
    }; }
    if (typeof b === "undefined") { b = 3; }
}

var C = (function () {
    function C(a, b) {
        if (typeof a === "undefined") { a = b; }
        if (typeof b === "undefined") { b = 1; }
    }
    C.prototype.method = function (a, b) {
        if (typeof a === "undefined") { a = b; }
        if (typeof b === "undefined") { b = 1; }
    };
    return C;
})();

// Function expressions
var x = function (a, b, c) {
    if (typeof a === "undefined") { a = b; }
    if (typeof b === "undefined") { b = c; }
    if (typeof c === "undefined") { c = d; }
    var d;
};
