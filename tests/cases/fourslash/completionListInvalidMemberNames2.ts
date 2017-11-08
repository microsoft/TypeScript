/// <reference path='fourslash.ts' />

////enum Foo {
////    X, Y, '☆'
////}
////Foo./*a*/;
////Foo["/*b*/"];

verify.completionsAt("a", ["X", "Y"]);
verify.completionsAt("b", ["X", "Y", "☆"]);
