// @declaration: true
var a: object & string = ""; // error
var b: object | string = ""; // ok
a = b; // error
b = a; // ok
