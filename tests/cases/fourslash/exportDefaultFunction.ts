/// <reference path='./fourslash.ts'/>

////export default function func() {
////    /*1*/
////}
//// /*2*/

goTo.marker('1');
verify.completionListContains("func", "function func(): void", /*documentation*/ undefined, "function");

goTo.marker('2');
verify.completionListContains("func", "function func(): void", /*documentation*/ undefined, "function");
