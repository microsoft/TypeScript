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