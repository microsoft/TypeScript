// @target: es6

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


