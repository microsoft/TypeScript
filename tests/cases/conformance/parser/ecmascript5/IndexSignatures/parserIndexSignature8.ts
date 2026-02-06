// @target: es2015
var foo: { [index: any]; }; // expect an error here
var foo2: { [index: RegExp]; }; // expect an error here
