/// <reference path="fourslash.ts" />

// @allowJs: true
// @Filename: /a.js
////function f() {
////   var /*1*/foo = this;
////   /*2*/foo.x = 1;
////}

goTo.file("/a.js")
verify.baselineRename(["1", "2"]);
