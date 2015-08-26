/// <reference path="fourslash.ts" />

// If the last argument to 'define' isn't a function expression
// but is a function type, use its return type

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// function myFunc() {
////     return { hello: 'world', size: 42 };
//// }
//// define('myMod', myFunc);
//// define('consumer', ['myMod'], function(mm) {
////     let x = mm;
////     mm/**/;
//// });

goTo.marker();
edit.insert('.');
verify.completionListContains("hello", undefined, undefined, 'property');
verify.completionListContains("size", undefined, undefined, 'property');
