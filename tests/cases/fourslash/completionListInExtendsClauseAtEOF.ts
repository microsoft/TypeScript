/// <reference path='fourslash.ts' />

////declare module mod {
////    class Foo { }
////}
////class Bar extends mod./**/

goTo.marker();
verify.memberListContains("Foo");
verify.memberListCount(1);