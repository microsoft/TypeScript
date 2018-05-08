// @lib: es5
var id: number = 10000;
var name: string = "my name";

var person = { name, id };

function foo(p: { name: string; id: number }) { }
foo(person);


var obj = { name: name, id: id };