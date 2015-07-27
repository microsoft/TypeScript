///<reference path="fourslash.ts" />

// Metadata coming after '!' in a module name is ignored

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// define('myMod', ['module'], function(m) {
////     m.exports = { hello: 'world', size: 42 };
//// });
//// define('consumer', ['myMod!watwat'], function(mm) {
////     let x = mm;
////     mm/**/;
//// });

goTo.marker();
edit.insert('.');
verify.completionListContains("hello", undefined, undefined, 'property');
verify.completionListContains("size", undefined, undefined, 'property');
edit.backspace();
