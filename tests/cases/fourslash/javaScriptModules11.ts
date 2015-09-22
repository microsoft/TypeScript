///<reference path="fourslash.ts" />

// If the last argument to 'define' isn't a function expression, we should
// use the type of that expression as the shape of the module

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// define('myMod', { hello: 'world', size: 42 });
//// define('consumer', ['myMod'], function(mm) {
////     let x = mm;
////     mm/**/;
//// });

goTo.marker();
edit.insert('.');
verify.completionListContains("hello", undefined, undefined, 'property');
verify.completionListContains("size", undefined, undefined, 'property');
