//@target: ES6
var s = Symbol.for("bitwise");
s & s;
s | s;
s ^ s;

s & 0;
0 | s;