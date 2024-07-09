/// <reference path='fourslash.ts'/>

////module M {
////    export var x = <T>(x: T) => x;
////}
////var r = M./**/;

verify.completions({ marker: "", exact: { name: "x", text: "var M.x: <T>(x: T) => T" } });
