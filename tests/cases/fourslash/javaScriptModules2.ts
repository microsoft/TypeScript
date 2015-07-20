///<reference path="fourslash.ts" />

// If the first argument to 'define' is a string, we register
// a module under that string.

// @allowNonTsExtensions: true

// @Filename: Foo.js
//// define('myMod', ['fs'], function(ff) {
////    return {x: 'hello'};
//// });
//// define(['myMod'], function(mm) {
////    var yy = mm.x;
////    yy/**/;
//// }

goTo.marker();
edit.insert('.');
verify.completionListContains("charCodeAt", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
