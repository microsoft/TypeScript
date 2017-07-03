/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
//// function MyObject(){
////     this.__property = 1;
//// }
//// var instance = new MyObject();
//// instance./*1*/

goTo.marker("1");
verify.completionListContains("__property", "(property) MyObject.__property: number");
