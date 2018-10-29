/// <reference path='fourslash.ts'/>

////type Options = "Option 1" | "Option 2" | "Option 3";
////var x: Options = "/*1*/Option 3";
////
////function f(a: Options) { };
////f("/*2*/

verify.completions({ marker: ["1", "2"], exact: ["Option 1", "Option 2", "Option 3"] });
