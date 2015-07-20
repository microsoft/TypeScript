///<reference path="fourslash.ts" />

// If the first argument to 'define' is a string, we register
// a module under that string (not this test). Otherwise (this test),
// we register it using the filename

// @allowNonTsExtensions: true

// @Filename: foo.js
//// define(function(ff) {
////    return {x: 'hello'};
//// });

// @Filename: bar.js
//// define(['./foo'], function(ff) {
////    let y = ff.x;
////    y/**/;
//// });

goTo.file('bar.js');
goTo.marker();
edit.insert('.');
verify.completionListContains("charCodeAt", /*displayText:*/ undefined, /*documentation*/ undefined, "method");
