/// <reference path='fourslash.ts'/>

////function f(a: { xa: number; xb: number; }) { }
////var xc;
////f({
////    /**/

verify.completions({ marker: "", exact: ["xa", "xb"] });
