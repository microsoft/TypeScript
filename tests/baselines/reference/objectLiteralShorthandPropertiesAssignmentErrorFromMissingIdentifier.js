//// [objectLiteralShorthandPropertiesAssignmentErrorFromMissingIdentifier.ts]
var id: number = 10000;
var name: string = "my name";

var person: { b: string; id: number } = { name, id };  // error
function bar(name: string, id: number): { name: number, id: string } { return { name, id }; }  // error
function foo(name: string, id: number): { name: string, id: number } { return { name, id }; }  // error
var person1: { name, id }; // ok
var person2: { name: string, id: number } = bar("hello", 5);


//// [objectLiteralShorthandPropertiesAssignmentErrorFromMissingIdentifier.js]
var id = 10000;
var name = "my name";
var person = { name: name, id: id }; // error
function bar(name, id) { return { name: name, id: id }; } // error
function foo(name, id) { return { name: name, id: id }; } // error
var person1; // ok
var person2 = bar("hello", 5);
