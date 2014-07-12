//// [assignFromBooleanInterface2.js]
var x = true;
var a;
var b;

a = x;
a = b;

b = a;
b = x;

x = a; // expected error
x = b; // expected error
