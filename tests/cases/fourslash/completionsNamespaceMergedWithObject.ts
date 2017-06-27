/// <reference path='fourslash.ts'/>

////namespace N {
////    export type T = number;
////}
////const N = { m() {} };
////let x: N./*type*/;
////N./*value*/;

goTo.marker("type");
verify.completionListContains("T");
verify.not.completionListContains("m");

goTo.marker("value");
verify.not.completionListContains("T");
verify.completionListContains("m");
