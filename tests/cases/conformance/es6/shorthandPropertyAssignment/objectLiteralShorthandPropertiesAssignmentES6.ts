// @lib: es5
// @target: es6
var id: number = 10000;
var name: string = "my name";

var person: { name: string; id: number } = { name, id };
function foo(obj: { name: string }): void { };
function bar(name: string, id: number) { return { name, id }; }
function bar1(name: string, id: number) { return { name }; }
function baz(name: string, id: number): { name: string; id: number } { return { name, id }; }

foo(person);
var person1 = bar("Hello", 5);
var person2: { name: string } = bar("Hello", 5);
var person3: { name: string; id: number } = bar("Hello", 5);
