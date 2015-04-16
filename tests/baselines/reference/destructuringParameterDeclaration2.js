//// [destructuringParameterDeclaration2.ts]
// If the parameter is a rest parameter, the parameter type is any[]
// A type annotation for a rest parameter must denote an array type.

// RestParameter:
//     ...   Identifier   TypeAnnotation(opt)

type arrayString = Array<String>
type someArray = Array<String> | number[];
type stringOrNumArray = Array<String|Number>;

function a0(...x: [number, number, string]) { }  // Error, rest parameter must be array type
function a1(...x: (number|string)[]) { }
function a2(...a) { }
function a3(...a: Array<String>) { }
function a4(...a: arrayString) { }
function a5(...a: stringOrNumArray) { }
function a6(...a: someArray) { }  // Error, rest parameter must be array type
function a7(...b?) { }  // Error, can't be optional
function a8(...b = [1,2,3]) { }  // Error, can't have initializer
function a9([a, b, [[c]]]) { }
function a10([a, b, [[c]], ...x]) { }
function a11([a, b, c, ...x]: number[]) { }


a1(1, 2, "hello", true);  // Error, parameter type is (number|string)[]
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a2([...array]);
a1(...array);
a1(...array2);  // Error parameter type is (number|string)[]

a9([1, 2, [["string"]], false, true]);   // Parameter type is [any, any, [[any]]]
a9([1, 2, "string", false, true]);       // Error, parameter type is [any, any, [[any]]]
a9([1, 2]);                              // Error, parameter type is [any, any, [[any]]]

a10([1, 2, [["string"]], false, true]);   // Parameter type is any[]
a10([1, 2, 3, false, true]);              // Parameter type is any[]
a10([1, 2]);                              // Parameter type is any[]

a11([1, 2]);            // Parameter type is number[]
a11([1, 2, "string"]);  // Error, parameter type is number[]


class C {
    constructor(public ...a) { }  // Error, rest parameter can't have accessibilityModifier
}

// Rest parameter with generic
function foo<T>(...a: T[]) { }
foo("hello", 1, 2);  // Error 
foo<number|string>("hello", 1, 2);
foo("hello", "world");

enum E { a, b }
const enum E1 { a, b }
function foo1<T extends Number>(...a: T[]) { }
foo1(1, 2, 3, E.a);
foo1(1, 2, 3, E1.a, E.b);
foo1(1, 2, "string", E1.a, E.b);  // Error




//// [destructuringParameterDeclaration2.js]
// If the parameter is a rest parameter, the parameter type is any[]
// A type annotation for a rest parameter must denote an array type.
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
}
function a3() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
function a4() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
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
} // Error, rest parameter must be array type
function a7() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i - 0] = arguments[_i];
    }
} // Error, can't be optional
function a8() {
    if (b === void 0) { b = [1, 2, 3]; }
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i - 0] = arguments[_i];
    }
} // Error, can't have initializer
function a9(_a) {
    var a = _a[0], b = _a[1], c = _a[2][0][0];
}
function a10(_a) {
    var a = _a[0], b = _a[1], c = _a[2][0][0], x = _a.slice(3);
}
function a11(_a) {
    var a = _a[0], b = _a[1], c = _a[2], x = _a.slice(3);
}
a1(1, 2, "hello", true); // Error, parameter type is (number|string)[]
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a2(array);
a1.apply(void 0, array);
a1.apply(void 0, array2); // Error parameter type is (number|string)[]
a9([1, 2, [["string"]], false, true]); // Parameter type is [any, any, [[any]]]
a9([1, 2, "string", false, true]); // Error, parameter type is [any, any, [[any]]]
a9([1, 2]); // Error, parameter type is [any, any, [[any]]]
a10([1, 2, [["string"]], false, true]); // Parameter type is any[]
a10([1, 2, 3, false, true]); // Parameter type is any[]
a10([1, 2]); // Parameter type is any[]
a11([1, 2]); // Parameter type is number[]
a11([1, 2, "string"]); // Error, parameter type is number[]
var C = (function () {
    function C(public) {
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
    } // Error, rest parameter can't have accessibilityModifier
    return C;
})();
// Rest parameter with generic
function foo() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i - 0] = arguments[_i];
    }
}
foo("hello", 1, 2); // Error 
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
        a[_i - 0] = arguments[_i];
    }
}
foo1(1, 2, 3, E.a);
foo1(1, 2, 3, 0 /* a */, E.b);
foo1(1, 2, "string", 0 /* a */, E.b); // Error
