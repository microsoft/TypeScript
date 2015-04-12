//// [destructuringParameterDeclaration1.ts]
type arrayString = Array<String>
type someArray = Array<String> | number[];
type stringOrNumArray = Array<String|Number>;

function a3(...x = [1,2,3]) { }
function a4(...x: (number|string)[]) { }
function a5(...a) { }
function a6(...a: Array<String>) { }
function a7(...a: arrayString) { }
function a8(...a: stringOrNumArray) { }
function a9(...a: someArray) { }
function a10(...b?) { }
function a11(...b = [1,2,3]) { }


a4(1, 2, "hello", true);
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a5([...array]);
a4(...array);
a4(...array2);

//// [destructuringParameterDeclaration1.js]
function a3() {
    if (x === void 0) { x = [1, 2, 3]; }
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i - 0] = arguments[_i];
    }
}
function a4() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i - 0] = arguments[_i];
    }
}
function a5() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
function a6() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
function a7() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
function a8() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
function a9() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
function a10() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i - 0] = arguments[_i];
    }
}
function a11() {
    if (b === void 0) { b = [1, 2, 3]; }
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i - 0] = arguments[_i];
    }
}
a4(1, 2, "hello", true);
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a5(array);
a4.apply(void 0, array);
a4.apply(void 0, array2);
