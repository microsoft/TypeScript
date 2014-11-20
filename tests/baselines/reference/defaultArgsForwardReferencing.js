//// [defaultArgsForwardReferencing.ts]
function left(a, b = a, c = b) {
    a;
    b;
}

function right(a = b, b = a) {
    a;
    b;
}

function right2(a = b, b = c, c = a) {
    a;
    b;
    c;
}

function inside(a = b) {
    var b;
}

function outside() {
    var b;
    function inside(a = b) { // Still an error because b is declared inside the function
        var b;
    }
}

function defaultArgFunction(a = function () { return b; }, b = 1) { }
function defaultArgArrow(a = () => () => b, b = 3) { }

class C {
    constructor(a = b, b = 1) { }
    method(a = b, b = 1) { }
}

// Function expressions
var x = (a = b, b = c, c = d) => { var d; };

//// [defaultArgsForwardReferencing.js]
function left(a) {
    var b = (arguments[1] === void 0) ? a : arguments[1];
    var c = (arguments[2] === void 0) ? b : arguments[2];
    a;
    b;
}
function right() {
    var a = (arguments[0] === void 0) ? b : arguments[0];
    var b = (arguments[1] === void 0) ? a : arguments[1];
    a;
    b;
}
function right2() {
    var a = (arguments[0] === void 0) ? b : arguments[0];
    var b = (arguments[1] === void 0) ? c : arguments[1];
    var c = (arguments[2] === void 0) ? a : arguments[2];
    a;
    b;
    c;
}
function inside() {
    var a = (arguments[0] === void 0) ? b : arguments[0];
    var b;
}
function outside() {
    var b;
    function inside() {
        var a = (arguments[0] === void 0) ? b : arguments[0];
        var b;
    }
}
function defaultArgFunction() {
    var a = (arguments[0] === void 0) ? function () {
        return b;
    } : arguments[0];
    var b = (arguments[1] === void 0) ? 1 : arguments[1];
}
function defaultArgArrow() {
    var a = (arguments[0] === void 0) ? function () { return function () { return b; }; } : arguments[0];
    var b = (arguments[1] === void 0) ? 3 : arguments[1];
}
var C = (function () {
    function C() {
        var a = (arguments[0] === void 0) ? b : arguments[0];
        var b = (arguments[1] === void 0) ? 1 : arguments[1];
    }
    C.prototype.method = function () {
        var a = (arguments[0] === void 0) ? b : arguments[0];
        var b = (arguments[1] === void 0) ? 1 : arguments[1];
    };
    return C;
})();
// Function expressions
var x = function () {
    var a = (arguments[0] === void 0) ? b : arguments[0];
    var b = (arguments[1] === void 0) ? c : arguments[1];
    var c = (arguments[2] === void 0) ? d : arguments[2];
    var d;
};
