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
function foo(x) { }
;
function bar(x, y) { }
; // error at "y"; no error at "x"
function func2(a, b, c) { }
; // error at "a,b,c"
function func3() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
}
; // error at "args" 
function func4(z, w) {
    if (z === void 0) { z = null; }
    if (w === void 0) { w = undefined; }
}
; // error at "z,w"
// these shouldn't be errors
function noError1(x, y) {
    if (x === void 0) { x = 3; }
    if (y === void 0) { y = 2; }
}
;
function noError2(x, y) { }
;
