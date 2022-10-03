//@target: ES6
var s = Symbol.for("multiply");
s * s;
s / s;
s % s;

s * 0;
0 / s;