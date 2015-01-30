//@target: ES6
var s = Symbol.for("add");
s + s;
s - s;
s + "";
s + 0;
"" + s;
0 + s;
s - 0;
0 - s;