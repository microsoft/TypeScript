/// <reference path='./fourslash.ts'/>

////export default class C {
////    method() { /*1*/ }
////}
//// /*2*/

goTo.marker('1');
verify.completionListContains("C", "class C", /*documentation*/ undefined, "class");

goTo.marker('2');
verify.completionListContains("C", "class C", /*documentation*/ undefined, "class");