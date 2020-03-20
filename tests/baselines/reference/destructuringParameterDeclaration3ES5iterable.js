//// [destructuringParameterDeclaration3ES5iterable.ts]
// If the parameter is a rest parameter, the parameter type is any[]
// A type annotation for a rest parameter must denote an array type.

// RestParameter:
//     ...   Identifier   TypeAnnotation(opt)

type arrayString = Array<String>
type someArray = Array<String> | number[];
type stringOrNumArray = Array<String|Number>;

function a1(...x: (number|string)[]) { }
function a2(...a) { }
function a3(...a: Array<String>) { }
function a4(...a: arrayString) { }
function a5(...a: stringOrNumArray) { }
function a9([a, b, [[c]]]) { }
function a10([a, b, [[c]], ...x]) { }
function a11([a, b, c, ...x]: number[]) { }


var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a2([...array]);
a1(...array);

a9([1, 2, [["string"]], false, true]);   // Parameter type is [any, any, [[any]]]

a10([1, 2, [["string"]], false, true]);   // Parameter type is any[]
a10([1, 2, 3, false, true]);              // Parameter type is any[]
a10([1, 2]);                              // Parameter type is any[]
a11([1, 2]);                              // Parameter type is number[]

// Rest parameter with generic
function foo<T>(...a: T[]) { }
foo<number|string>("hello", 1, 2);
foo("hello", "world");

enum E { a, b }
const enum E1 { a, b }
function foo1<T extends Number>(...a: T[]) { }
foo1(1, 2, 3, E.a);
foo1(1, 2, 3, E1.a, E.b);




//// [destructuringParameterDeclaration3ES5iterable.js]
// If the parameter is a rest parameter, the parameter type is any[]
// A type annotation for a rest parameter must denote an array type.
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function a1() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
function a2() {
    var a = [];
    for (var _a = 0; _a < arguments.length; _a++) {
        a[_a] = arguments[_a];
    }
}
function a3() {
    var a = [];
    for (var _b = 0; _b < arguments.length; _b++) {
        a[_b] = arguments[_b];
    }
}
function a4() {
    var a = [];
    for (var _c = 0; _c < arguments.length; _c++) {
        a[_c] = arguments[_c];
    }
}
function a5() {
    var a = [];
    for (var _d = 0; _d < arguments.length; _d++) {
        a[_d] = arguments[_d];
    }
}
function a9(_e) {
    var _f = __read(_e, 3), a = _f[0], b = _f[1], _g = __read(_f[2], 1), _h = __read(_g[0], 1), c = _h[0];
}
function a10(_j) {
    var _k = __read(_j), a = _k[0], b = _k[1], _l = __read(_k[2], 1), _m = __read(_l[0], 1), c = _m[0], x = _k.slice(3);
}
function a11(_o) {
    var _p = __read(_o), a = _p[0], b = _p[1], c = _p[2], x = _p.slice(3);
}
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a2(__spread(array));
a1.apply(void 0, __spread(array));
a9([1, 2, [["string"]], false, true]); // Parameter type is [any, any, [[any]]]
a10([1, 2, [["string"]], false, true]); // Parameter type is any[]
a10([1, 2, 3, false, true]); // Parameter type is any[]
a10([1, 2]); // Parameter type is any[]
a11([1, 2]); // Parameter type is number[]
// Rest parameter with generic
function foo() {
    var a = [];
    for (var _q = 0; _q < arguments.length; _q++) {
        a[_q] = arguments[_q];
    }
}
foo("hello", 1, 2);
foo("hello", "world");
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
function foo1() {
    var a = [];
    for (var _r = 0; _r < arguments.length; _r++) {
        a[_r] = arguments[_r];
    }
}
foo1(1, 2, 3, E.a);
foo1(1, 2, 3, 0 /* a */, E.b);
