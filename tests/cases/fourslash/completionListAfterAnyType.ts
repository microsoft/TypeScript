/// <reference path="fourslash.ts"/>

//// declare class myString {
////     charAt(pos: number): string;
//// }
////
//// function bar(a: myString) {
////     var x: any = a./**/
//// }

verify.completions({ marker: "", exact: "charAt" });
