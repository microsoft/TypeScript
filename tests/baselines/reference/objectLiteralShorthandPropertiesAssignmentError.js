//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesAssignmentError.ts] ////

//// [objectLiteralShorthandPropertiesAssignmentError.ts]
var id: number = 10000;
var name: string = "my name";

var person: { b: string; id: number } = { name, id };  // error
var person1: { name, id };  // ok
function foo(name: string, id: number): { id: string, name: number } { return { name, id }; }  // error
function bar(obj: { name: string; id: boolean }) { }
bar({ name, id });  // error



//// [objectLiteralShorthandPropertiesAssignmentError.js]
var id = 10000;
var name = "my name";
var person = { name: name, id: id }; // error
var person1; // ok
function foo(name, id) { return { name: name, id: id }; } // error
function bar(obj) { }
bar({ name: name, id: id }); // error
