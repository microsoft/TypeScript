var a: { [s: string]: string; };
var b: { [n: number]: string; };
var c: {};

a = b;
a = c;
b = a;
b = c;
c = a;
c = b;