///<reference path="fourslash.ts" />

// No prototype assignments are needed to enable class inference

// @allowNonTsExtensions: true
// @Filename: myMod.js
//// function myCtor() {
////     this.foo = 'hello';
////     this.bar = 10;
//// }
//// let x = new myCtor();
//// x/**/

goTo.marker();
edit.insert('.');

// Check members of the function
verify.completionListContains('foo', undefined, undefined, 'property');
verify.completionListContains('bar', undefined, undefined, 'property');
