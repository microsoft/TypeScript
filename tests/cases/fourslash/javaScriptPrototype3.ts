///<reference path="fourslash.ts" />

// Inside an inferred method body, the type of 'this' is the class type

// @allowNonTsExtensions: true
// @Filename: myMod.js
//// function myCtor(x) {
////     this.qua = 10;
//// }
//// myCtor.prototype.foo = function() { return this/**/; };
//// myCtor.prototype.bar = function() { return '' };
//// 

goTo.marker();
edit.insert('.');

// Check members of the function
verify.completionListContains('foo', undefined, undefined, 'method');
verify.completionListContains('bar', undefined, undefined, 'method');
verify.completionListContains('qua', undefined, undefined, 'property');
