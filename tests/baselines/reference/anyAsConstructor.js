//// [anyAsConstructor.ts]
// any is considered an untyped function call
// can be called except with type arguments which is an error

var x: any;
var a = new x();
var b = new x('hello');
var c = new x(x);

// grammar allows this for constructors
var d = new x<any>(x); // no error

//// [anyAsConstructor.js]
// any is considered an untyped function call
// can be called except with type arguments which is an error
var x;
var a = new x();
var b = new x('hello');
var c = new x(x);
// grammar allows this for constructors
var d = new x(x); // no error
