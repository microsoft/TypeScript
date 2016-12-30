/// <reference path='fourslash.ts' />

////module Bar {
////    export class Blah { }
////}
////
////class Point {
////    public Foo(x: Bar./**/Blah, y: Bar.Blah) { }
////}

goTo.marker();
verify.completionListContains('Blah');