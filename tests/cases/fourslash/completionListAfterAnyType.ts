/// <reference path="fourslash.ts"/>

//// declare class myString {
////     charAt(pos: number): string;
//// }
//// 
//// function bar(a: myString) {
////     var x: any = a./**/
//// }

goTo.marker();
verify.completionListContains("charAt");
verify.completionListCount(1);
