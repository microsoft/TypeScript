//// [objectLiteralShorthandPropertiesAssignmentES6.ts]
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


//// [objectLiteralShorthandPropertiesAssignmentES6.js]
var id = 10000;
var name = "my name";
var person = { name, id };
function foo(obj) { }
;
function bar(name, id) { return { name, id }; }
function bar1(name, id) { return { name }; }
function baz(name, id) { return { name, id }; }
foo(person);
var person1 = bar("Hello", 5);
var person2 = bar("Hello", 5);
var person3 = bar("Hello", 5);
