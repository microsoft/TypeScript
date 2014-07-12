//// [restParamsWithNonRestParams.js]
function foo() {
    var b = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        b[_i] = arguments[_i + 0];
    }
}
foo(); // ok
function foo2(a) {
    var b = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        b[_i] = arguments[_i + 1];
    }
}
foo2(); // should be an error
function foo3(a) {
    var b = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        b[_i] = arguments[_i + 1];
    }
}
foo3(); // error but shouldn't be
