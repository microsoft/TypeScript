//// [objectLiteralShorthandPropertiesAssignment.ts]
var id: number = 10000;
var name: string = "my name";

var person: { name: string; id: number } = { name, id };


//// [objectLiteralShorthandPropertiesAssignment.js]
var id = 10000;
var name = "my name";
var person = { name: name, id: id };
