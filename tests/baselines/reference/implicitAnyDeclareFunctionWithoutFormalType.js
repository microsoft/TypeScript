//// [implicitAnyDeclareFunctionWithoutFormalType.js]
// these should be errors
function foo(x) {
}
;
function bar(x, y) {
}
;
function func2(a, b, c) {
}
;
function func3() {
    var args = [];
    for (var _i = 0; _i < (arguments.length - 0); _i++) {
        args[_i] = arguments[_i + 0];
    }
}
;
function func4(z, w) {
    if (typeof z === "undefined") { z = null; }
    if (typeof w === "undefined") { w = undefined; }
}
;

// these shouldn't be errors
function noError1(x, y) {
    if (typeof x === "undefined") { x = 3; }
    if (typeof y === "undefined") { y = 2; }
}
;
function noError2(x, y) {
}
;
