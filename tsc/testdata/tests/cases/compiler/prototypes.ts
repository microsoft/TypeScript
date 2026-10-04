// @target: es2015
Object.prototype; // ok
new Object().prototype; // error
function f() {}
f.prototype;