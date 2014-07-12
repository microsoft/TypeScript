// FunctionExpression with no return type annotation with multiple return statements with unrelated types
var f1 = function () {
    return '';
    return 3;
};
var f2 = function x() {
    return '';
    return 3;
};
var f3 = () => {
    return '';
    return 3;
};

// FunctionExpression with no return type annotation with return branch of number[] and other of string[]
var f4 = function () {
    if (true) {
        return [''];
    } else {
        return [1];
    }
}

// Function implemetnation with non -void return type annotation with no return
function f5(): number {
}

var m;
// Function signature with parameter initializer referencing in scope local variable
function f6(n = m) {
    var m = 4;
}

// Function signature with initializer referencing other parameter to the right
function f7(n = m, m?) {
}

// FunctionExpression with non -void return type annotation with a throw, no return, and other code
// Should be error but isn't
undefined === function (): number {
    throw undefined;
    var x = 4;
};
