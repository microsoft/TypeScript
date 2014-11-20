//// [implicitAnyDeclareFunctionWithoutFormalType.ts]
// these should be errors
function foo(x) { };
function bar(x: number, y) { };  // error at "y"; no error at "x"
function func2(a, b, c) { };     // error at "a,b,c"
function func3(...args) { };     // error at "args" 
function func4(z= null, w= undefined) { };  // error at "z,w"

// these shouldn't be errors
function noError1(x= 3, y= 2) { };
function noError2(x: number, y: string) { };


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
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
}
;
function func4() {
    var z = (arguments[0] === void 0) ? null : arguments[0];
    var w = (arguments[1] === void 0) ? undefined : arguments[1];
}
;
// these shouldn't be errors
function noError1() {
    var x = (arguments[0] === void 0) ? 3 : arguments[0];
    var y = (arguments[1] === void 0) ? 2 : arguments[1];
}
;
function noError2(x, y) {
}
;
