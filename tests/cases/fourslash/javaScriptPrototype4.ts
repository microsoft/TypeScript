///<reference path="fourslash.ts" />

// Check for any odd symbol leakage

// @allowNonTsExtensions: true
// @Filename: myMod.js
//// function myCtor(x) {
////     this.qua = 10;
//// }
//// myCtor.prototype.foo = function() { return 32 };
//// myCtor.prototype.bar = function() { return '' };
//// 
//// myCtor/*1*/

goTo.marker('1');
edit.insert('.');

// Check members of the function
verify.completionListContains('foo', undefined, undefined, 'warning');
verify.completionListContains('bar', undefined, undefined, 'warning');
verify.completionListContains('qua', undefined, undefined, 'warning');
