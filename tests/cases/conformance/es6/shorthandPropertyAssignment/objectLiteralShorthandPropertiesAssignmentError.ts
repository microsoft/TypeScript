// @lib: es5
var id: number = 10000;
var name: string = "my name";

var person: { b: string; id: number } = { name, id };  // error
var person1: { name, id };  // ok
function foo(name: string, id: number): { id: string, name: number } { return { name, id }; }  // error
function bar(obj: { name: string; id: boolean }) { }
bar({ name, id });  // error

