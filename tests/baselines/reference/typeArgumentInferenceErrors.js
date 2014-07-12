//// [typeArgumentInferenceErrors.js]
// Generic call with multiple type parameters and only one used in parameter type annotation
function someGenerics1(n, m) {
}
someGenerics1(3, 4); // Error

// 2 parameter generic call with argument 1 of type parameter type and argument 2 of function type whose parameter is of type parameter type
function someGenerics4(n, f) {
}
someGenerics4('', function (x) {
    return '';
}); // Error

// 2 parameter generic call with argument 2 of type parameter type and argument 1 of function type whose parameter is of type parameter type
function someGenerics5(n, f) {
}
someGenerics5('', function (x) {
    return '';
}); // Error

// Generic call with multiple arguments of function types that each have parameters of the same generic type
function someGenerics6(a, b, c) {
}
someGenerics6(function (n) {
    return n;
}, function (n) {
    return n;
}, function (n) {
    return n;
}); // Error
