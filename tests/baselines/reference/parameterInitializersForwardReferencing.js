//// [tests/cases/conformance/functions/parameterInitializersForwardReferencing.ts] ////

//// [parameterInitializersForwardReferencing.ts]
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

// Should not produce errors - can reference later parameters if they occur within a function expression initializer.
function f(a, b = function () { return c; }, c = b()) {
}

//// [parameterInitializersForwardReferencing.js]
function left(a, b, c) {
    if (b === void 0) { b = a; }
    if (c === void 0) { c = b; }
    a;
    b;
}
function right(a, b) {
    if (a === void 0) { a = b; }
    if (b === void 0) { b = a; }
    a;
    b;
}
function right2(a, b, c) {
    if (a === void 0) { a = b; }
    if (b === void 0) { b = c; }
    if (c === void 0) { c = a; }
    a;
    b;
    c;
}
function inside(a) {
    if (a === void 0) { a = b; }
    var b;
}
function outside() {
    var b;
    function inside(a) {
        if (a === void 0) { a = b; }
        var b;
    }
}
function defaultArgFunction(a, b) {
    if (a === void 0) { a = function () { return b; }; }
    if (b === void 0) { b = 1; }
}
function defaultArgArrow(a, b) {
    if (a === void 0) { a = function () { return function () { return b; }; }; }
    if (b === void 0) { b = 3; }
}
var C = /** @class */ (function () {
    function C(a, b) {
        if (a === void 0) { a = b; }
        if (b === void 0) { b = 1; }
    }
    C.prototype.method = function (a, b) {
        if (a === void 0) { a = b; }
        if (b === void 0) { b = 1; }
    };
    return C;
}());
// Function expressions
var x = function (a, b, c) {
    if (a === void 0) { a = b; }
    if (b === void 0) { b = c; }
    if (c === void 0) { c = d; }
    var d;
};
// Should not produce errors - can reference later parameters if they occur within a function expression initializer.
function f(a, b, c) {
    if (b === void 0) { b = function () { return c; }; }
    if (c === void 0) { c = b(); }
}
