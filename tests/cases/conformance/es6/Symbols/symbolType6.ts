//@target: ES6
var s = Symbol.for("add");
var a: any;
s + s;
s - s;
s + "";
s + a;
s + 0;
"" + s;
a + s;
0 + s;
s - 0;
0 - s;

(s || "") + "";
"" + (s || "");