/// <reference path='fourslash.ts' />

////declare namespace mod {
////    class Foo { }
////}
////class Bar extends mod./**/

verify.completions({ marker: "", includes: "Foo" });
