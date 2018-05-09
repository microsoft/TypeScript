/// <reference path='fourslash.ts' />

////declare module mod {
////    class Foo { }
////}
////class Bar extends mod./**/

verify.completions({ marker: "", includes: "Foo" });
