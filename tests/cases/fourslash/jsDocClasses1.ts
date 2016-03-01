///<reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: Foo.js

//// function fn() {
//// 	this.foo = 10;
//// }
//// fn.prototype.foo = 14;
//// var x = new fn();
//// 
//// function fn2() {
//// 	this.foo = 10;
//// 	this.foo = 10;
//// }
//// fn2.prototype.foo = 14;
//// fn2.prototype.foo = 14;
//// var y = new fn2();
//// 
//// function fn3() {
//// 	this.foo = 10;
//// }
//// fn3.prototype.foo = 14;
//// fn3.prototype.foo = 14;
//// var z = new fn3();

verify.numberOfErrorsInCurrentFile(0);

