/// <reference path='fourslash.ts' />

////namespace Bar {
////    export class Blah { }
////}
////
////class Point {
////    public Foo(x: Bar./**/Blah, y: Bar.Blah) { }
////}

verify.completions({ marker: "", exact: "Blah" });
