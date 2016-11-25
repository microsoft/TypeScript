var x = {};
var y = {foo: "bar"};
var a: object;
x = a;
y = a; // expect error

var n = 123;
var b = true;
var s = "fooo";

a = n; // expect error
a = b; // expect error
a = s; // expect error

n = a; // expect error
b = a; // expect error
s = a; // expect error
