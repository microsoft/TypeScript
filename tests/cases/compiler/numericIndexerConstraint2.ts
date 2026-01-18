class Foo { foo() { } }
declare var x: { [index: string]: Foo; };
var a: { one: number; } = { one: 1 };
x = a;