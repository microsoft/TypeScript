//// [tests/cases/conformance/es6/shorthandPropertyAssignment/objectLiteralShorthandPropertiesFunctionArgument.ts] ////

//// [objectLiteralShorthandPropertiesFunctionArgument.ts]
var id: number = 10000;
var name: string = "my name";

var person = { name, id };

function foo(p: { name: string; id: number }) { }
foo(person);


var obj = { name: name, id: id };

//// [objectLiteralShorthandPropertiesFunctionArgument.js]
var id = 10000;
var name = "my name";
var person = { name: name, id: id };
function foo(p) { }
foo(person);
var obj = { name: name, id: id };
