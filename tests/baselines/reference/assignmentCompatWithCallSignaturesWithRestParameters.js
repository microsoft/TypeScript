//// [assignmentCompatWithCallSignaturesWithRestParameters.js]
// call signatures in derived types must have the same or fewer optional parameters as the target for assignment

var a;
a = function () {
    return 1;
}; // ok, same number of required params
a = function () {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return 1;
}; // ok, same number of required params
a = function () {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return 1;
}; // error, type mismatch
a = function (x) {
    return 1;
}; // ok, same number of required params
a = function (x, y, z) {
    return 1;
}; // ok, same number of required params
a = function (x) {
    return 1;
}; // ok, rest param corresponds to infinite number of params
a = function (x) {
    return 1;
}; // error, incompatible type

var a2;
a2 = function () {
    return 1;
}; // ok, fewer required params
a2 = function () {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
    return 1;
}; // ok, fewer required params
a2 = function (x) {
    return 1;
}; // ok, fewer required params
a2 = function (x) {
    return 1;
}; // ok, same number of required params
a2 = function (x) {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        args[_i] = arguments[_i + 1];
    }
    return 1;
}; // ok, same number of required params
a2 = function (x) {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        args[_i] = arguments[_i + 1];
    }
    return 1;
}; // should be type mismatch error
a2 = function (x, y) {
    return 1;
}; // ok, rest param corresponds to infinite number of params
a2 = function (x, y) {
    return 1;
}; // ok, same number of required params

var a3;
a3 = function () {
    return 1;
}; // ok, fewer required params
a3 = function (x) {
    return 1;
}; // ok, fewer required params
a3 = function (x) {
    return 1;
}; // ok, same number of required params
a3 = function (x, y) {
    return 1;
}; // ok, all present params match
a3 = function (x, y, z) {
    return 1;
}; // error
a3 = function (x) {
    var z = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        z[_i] = arguments[_i + 1];
    }
    return 1;
}; // error
a3 = function (x, y, z) {
    return 1;
}; // error

var a4;
a4 = function () {
    return 1;
}; // ok, fewer required params
a4 = function (x, y) {
    return 1;
}; // error, type mismatch
a4 = function (x) {
    return 1;
}; // ok, all present params match
a4 = function (x, y) {
    return 1;
}; // error, second param has type mismatch
a4 = function (x, y) {
    return 1;
}; // ok, same number of required params with matching types
a4 = function (x) {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        args[_i] = arguments[_i + 1];
    }
    return 1;
}; // error, rest params have type mismatch
