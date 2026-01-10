class Foo { foo() { } }
declare var x: { [index: string]: number; };
var result: Foo = x["one"]; // error
