/// <reference path="fourslash.ts"/>

//// declare class myString {
////     charAt(pos: number): string;
//// }
//// 
//// function bar(a: myString) {
////     var x: any = a./**/
//// }

goTo.marker();
verify.memberListContains("charAt");
verify.memberListCount(1);
