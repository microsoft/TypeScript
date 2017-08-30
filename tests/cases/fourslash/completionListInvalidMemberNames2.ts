/// <reference path='fourslash.ts' />

////enum Foo {
////    X, Y, '☆'
////}
////var x = Foo./**/

verify.completionsAt("", ["X", "Y", '"☆"']);
