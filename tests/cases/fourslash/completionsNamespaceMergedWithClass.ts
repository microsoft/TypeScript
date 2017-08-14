/// <reference path='fourslash.ts'/>

////class C {
////    static m() { }
////}
////
////class D extends C {}
////namespace D {
////    export type T = number;
////}
////
////let x: D./*type*/;
////D./*value*/

goTo.marker("type");
verify.completionListContains("T");
verify.not.completionListContains("m");

goTo.marker("value");
verify.not.completionListContains("T");
verify.completionListContains("m");
