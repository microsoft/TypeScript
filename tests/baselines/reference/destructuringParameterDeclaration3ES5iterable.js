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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function a1() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
function a2() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
}
function a3() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
}
function a4() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
}
function a5() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
}
function a9(_a) {
    var _b = __read(_a, 3), a = _b[0], b = _b[1], _c = __read(_b[2], 1), _d = __read(_c[0], 1), c = _d[0];
}
function a10(_a) {
    var _b = __read(_a), a = _b[0], b = _b[1], _c = __read(_b[2], 1), _d = __read(_c[0], 1), c = _d[0], x = _b.slice(3);
}
function a11(_a) {
    var _b = __read(_a), a = _b[0], b = _b[1], c = _b[2], x = _b.slice(3);
}
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a2(__spreadArray([], __read(array), false));
a1.apply(void 0, __spreadArray([], __read(array), false));
a9([1, 2, [["string"]], false, true]); // Parameter type is [any, any, [[any]]]
a10([1, 2, [["string"]], false, true]); // Parameter type is any[]
a10([1, 2, 3, false, true]); // Parameter type is any[]
a10([1, 2]); // Parameter type is any[]
a11([1, 2]); // Parameter type is number[]
// Rest parameter with generic
function foo() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
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
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
}
foo1(1, 2, 3, E.a);
foo1(1, 2, 3, 0 /* a */, E.b);
