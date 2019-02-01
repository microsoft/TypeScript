/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
//// function MyObject(){
////     this.__property = 1;
//// }
//// var instance = new MyObject();
//// instance./*1*/

verify.completions({
    marker: "1",
    exact: [
        { name: "__property", text: "(property) MyObject.__property: number" },
        "MyObject",
        "instance",
    ],
});
