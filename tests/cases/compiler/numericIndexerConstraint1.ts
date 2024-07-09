class Foo { foo() { } }
var x: { [index: string]: number; };
var result: Foo = x["one"]; // error
