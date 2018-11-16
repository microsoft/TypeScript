/// <reference path='fourslash.ts'/>

////class A {}
////A./*1*/prototype;
////A./*2*/

verify.quickInfoAt("1", "(property) A.prototype: A");

verify.completions({ marker: "2", includes: [{ name: "prototype", text: "(property) A.prototype: A" }] });
