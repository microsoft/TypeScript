//// [objectLiteralShorthandPropertiesAssignment2.ts]
var id: number = 10000;
var name: string = "my name";

var person: { b: string; id: number } = { name, id };  // error


//// [objectLiteralShorthandPropertiesAssignment2.js]
var id = 10000;
var name = "my name";
var person = { name: name, id: id }; // error
