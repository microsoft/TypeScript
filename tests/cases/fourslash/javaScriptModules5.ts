///<reference path="fourslash.ts" />

// The type of a module is its assignment to 'module.exports' if there
// were no 'return' statements in its body

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// define('myMod', ['module'], function(m) {
////     m.exports = { hello: 'world', size: 42 };
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
edit.backspace();

goTo.marker('2');
edit.insert('.');
verify.completionListContains("charCodeAt", undefined, undefined, 'method');
