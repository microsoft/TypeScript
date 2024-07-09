var x: { [index: string]: string; one: string; };
var a: { one: string; };
var b: { one: number; two: string; };
x = a;
x = b; // error
