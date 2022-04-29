/// <reference path='fourslash.ts'/>

////var x = { a: 0 };
////with(x./*1*/

verify.completions({ marker: "1", exact: "a" });
