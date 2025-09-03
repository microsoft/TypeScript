//// [tests/cases/conformance/es6/destructuring/destructuringParameterDeclaration4.ts] ////

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
function a0(...x) { } // Error, rest parameter must be array type
function a1(...x) { }
function a2(...a) { } // Error, rest parameter must be array type
function a3(...b) { } // Error, can't be optional
function a4(...b = [1, 2, 3]) { } // Error, can't have initializer
function a5([a, b, [[c]]]) { }
function a6([a, b, c, ...x]) { }
a1(1, 2, "hello", true); // Error, parameter type is (number|string)[]
a1(...array2); // Error parameter type is (number|string)[]
a5([1, 2, "string", false, true]); // Error, parameter type is [any, any, [[any]]]
a5([1, 2]); // Error, parameter type is [any, any, [[any]]]
a6([1, 2, "string"]); // Error, parameter type is number[]
var temp = [1, 2, 3];
class C {
    temp;
    constructor(...temp) {
        this.temp = temp;
    } // Error, rest parameter can't have properties
}
// Rest parameter with generic
function foo1(...a) { }
foo1(1, 2, "string", E1.a, E.b); // Error
