///<reference path="fourslash.ts" />

// ES6 classes can extend from JS classes

// @allowNonTsExtensions: true
// @Filename: myMod.js
//// function myCtor(x) {
////     this.qua = 10;
//// }
//// myCtor.prototype.foo = function() { return 32 };
//// myCtor.prototype.bar = function() { return '' };
//// 
//// class MyClass extends myCtor {
//// 	fn() {
////        this/*1*/
//// 		let y = super.foo();
//// 		y;
//// 	}
//// }
//// var n = new MyClass(3);
//// n/*2*/;

goTo.marker('1');
edit.insert('.');
// Current class method
verify.completionListContains('fn', undefined, undefined, 'method');
// Base class method
verify.completionListContains('foo', undefined, undefined, 'method');
// Base class instance property
verify.completionListContains('qua', undefined, undefined, 'property');
edit.backspace();

// Derived class instance from outside the class
goTo.marker('2');
edit.insert('.');
verify.completionListContains('fn', undefined, undefined, 'method');
// Base class method
verify.completionListContains('foo', undefined, undefined, 'method');
// Base class instance property
verify.completionListContains('qua', undefined, undefined, 'property');
