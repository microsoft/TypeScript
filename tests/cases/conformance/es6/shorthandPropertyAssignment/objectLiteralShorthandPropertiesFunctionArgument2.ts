// @lib: es5
var id: number = 10000;
var name: string = "my name";

var person = { name, id };

function foo(p: { a: string; id: number }) { }
foo(person);  // error
