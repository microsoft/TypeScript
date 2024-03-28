//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesFunctionArgument2.ts] ////

//// [objectLiteralShorthandPropertiesFunctionArgument2.ts]
var id: number = 10000;
var name: string = "my name";

var person = { name, id };

function foo(p: { a: string; id: number }) { }
foo(person);  // error


//// [objectLiteralShorthandPropertiesFunctionArgument2.js]
var id = 10000;
var name = "my name";
var person = { name: name, id: id };
function foo(p) { }
foo(person); // error
