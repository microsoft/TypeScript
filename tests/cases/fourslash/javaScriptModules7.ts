///<reference path="fourslash.ts" />

// You can use the CommonJS wrapper by not specifying a dependency array
// and naming your function arguments require, [exports [, module]]. Assignments
// to exports.propName or module.exports.propName add properties.

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// define('myMod', function(require, exports, module) {
////     exports.hello = 'world';
////     exports.size = 42;
////     module.exports.other = [];
//// });
//// define('consumer', ['myMod'], function(mm) {
////     let x = mm;
////     mm/*1*/;
////     let y = mm.hello;
////     y/*2*/;
//// });

goTo.marker('1');
edit.insert('.');
verify.completionListContains("hello", undefined, undefined, 'property');
verify.completionListContains("size", undefined, undefined, 'property');
verify.completionListContains("other", undefined, undefined, 'property');
edit.backspace();

goTo.marker('2');
edit.insert('.');
verify.completionListContains("charCodeAt", undefined, undefined, 'method');
