/// <reference path='fourslash.ts'/>

////interface Iterator<T, U> {
////    (value: T, index: any, list: any): U
////}
////var i: Iterator<string, number>;
////i/**/

verify.completions({ marker: "", includes: { name: "i", text: "var i: Iterator<string, number>" } });
