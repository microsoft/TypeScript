//// [destructuringParameterDeclaration4.ts]
// If the parameter is a rest parameter, the parameter type is any[]
// A type annotation for a rest parameter must denote an array type.

// RestParameter:
//     ...   Identifier   TypeAnnotation(opt)

type arrayString = Array<String>
type someArray = Array<String> | number[];
type stringOrNumArray = Array<String|Number>;

function a0(...x: [number, number, string]) { }  // Error, rest parameter must be array type
function a1(...x: (number|string)[]) { }
function a2(...a: someArray) { }  // Error, rest parameter must be array type
function a3(...b?) { }            // Error, can't be optional
function a4(...b = [1,2,3]) { }   // Error, can't have initializer
function a5([a, b, [[c]]]) { }
function a6([a, b, c, ...x]: number[]) { }


a1(1, 2, "hello", true);  // Error, parameter type is (number|string)[]
a1(...array2);            // Error parameter type is (number|string)[]
a5([1, 2, "string", false, true]);       // Error, parameter type is [any, any, [[any]]]
a5([1, 2]);                              // Error, parameter type is [any, any, [[any]]]
a6([1, 2, "string"]);                   // Error, parameter type is number[]


var temp = [1, 2, 3];
class C {
    constructor(public ...temp) { }  // Error, rest parameter can't have properties
}

// Rest parameter with generic
function foo1<T extends Number>(...a: T[]) { }
foo1(1, 2, "string", E1.a, E.b);  // Error




//// [destructuringParameterDeclaration4.js]
// If the parameter is a rest parameter, the parameter type is any[]
// A type annotation for a rest parameter must denote an array type.
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function a0() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i - 0] = arguments[_i];
    }
} // Error, rest parameter must be array type
function a1() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i - 0] = arguments[_i];
    }
}
function a2() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
} // Error, rest parameter must be array type
function a3() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i - 0] = arguments[_i];
    }
} // Error, can't be optional
function a4() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i - 0] = arguments[_i];
    }
} // Error, can't have initializer
function a5(_a) {
    var _b = __read(_a, 3), a = _b[0], b = _b[1], _c = __read(_b[2], 1), _d = __read(_c[0], 1), c = _d[0];
}
function a6(_a) {
    var _b = __read(_a), a = _b[0], b = _b[1], c = _b[2], x = _b.slice(3);
}
a1(1, 2, "hello", true); // Error, parameter type is (number|string)[]
a1.apply(void 0, __spread(array2)); // Error parameter type is (number|string)[]
a5([1, 2, "string", false, true]); // Error, parameter type is [any, any, [[any]]]
a5([1, 2]); // Error, parameter type is [any, any, [[any]]]
a6([1, 2, "string"]); // Error, parameter type is number[]
var temp = [1, 2, 3];
var C = (function () {
    function C() {
        var temp = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            temp[_i - 0] = arguments[_i];
        }
        this.temp = temp;
    } // Error, rest parameter can't have properties
    return C;
}());
// Rest parameter with generic
function foo1() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
foo1(1, 2, "string", E1.a, E.b); // Error
