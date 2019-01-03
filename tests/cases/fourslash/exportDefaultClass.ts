/// <reference path='./fourslash.ts'/>

////export default class C {
////    method() { /*1*/ }
////}
//// /*2*/

verify.completions({ marker: test.markers(), includes: { name: "C", text: "class C", kind: "class", kindModifiers: "export" } });
