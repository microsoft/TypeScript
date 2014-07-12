//// [typeParameterUsedAsTypeParameterConstraint.js]
// Type parameters are in scope in their own and other type parameter lists
function foo(x, y) {
    x = y;
    return y;
}

function foo2(x, y) {
    x = y;
    return y;
}

var f = function (x, y) {
    x = y;
    return y;
};

var f2 = function (x, y) {
    x = y;
    return y;
};

var f3 = function (x, y) {
    x = y;
    return y;
};

var f4 = function (x, y) {
    x = y;
    return y;
};
