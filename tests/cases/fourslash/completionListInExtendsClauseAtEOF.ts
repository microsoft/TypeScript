/// <reference path='fourslash.ts' />

////declare module mod {
////    class Foo { }
////}
////class Bar extends mod./**/

goTo.marker();
verify.completionListContains("Foo");
verify.completionListCount(1);