//@target: ES6
var s = Symbol.for("logical");
s && s;
s && [];
0 && s;
s || s;
s || 1;
({}) || s;