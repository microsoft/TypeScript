/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
////function f() {
////    /*1*/this./*2*/x = 0;
////}
////f.prototype.setX = function() {
////    /*3*/this./*4*/x = 1;
////}
////f.prototype.useX = function() { this./*5*/x; }

verify.baselineFindAllReferences('1', '2', '3', '4', '5');
