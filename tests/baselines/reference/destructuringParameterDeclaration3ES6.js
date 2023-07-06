//// [tests/cases/conformance/es6/destructuring/destructuringParameterDeclaration3ES6.ts] ////

//// [destructuringParameterDeclaration3ES6.ts]
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




//// [destructuringParameterDeclaration3ES6.js]
// If the parameter is a rest parameter, the parameter type is any[]
// A type annotation for a rest parameter must denote an array type.
function a1(...x) { }
function a2(...a) { }
function a3(...a) { }
function a4(...a) { }
function a5(...a) { }
function a9([a, b, [[c]]]) { }
function a10([a, b, [[c]], ...x]) { }
function a11([a, b, c, ...x]) { }
var array = [1, 2, 3];
var array2 = [true, false, "hello"];
a2([...array]);
a1(...array);
a9([1, 2, [["string"]], false, true]); // Parameter type is [any, any, [[any]]]
a10([1, 2, [["string"]], false, true]); // Parameter type is any[]
a10([1, 2, 3, false, true]); // Parameter type is any[]
a10([1, 2]); // Parameter type is any[]
a11([1, 2]); // Parameter type is number[]
// Rest parameter with generic
function foo(...a) { }
foo("hello", 1, 2);
foo("hello", "world");
var E;
(function (E) {
    E[E["a"] = 0] = "a";
    E[E["b"] = 1] = "b";
})(E || (E = {}));
function foo1(...a) { }
foo1(1, 2, 3, E.a);
foo1(1, 2, 3, 0 /* E1.a */, E.b);
