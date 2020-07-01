/// <reference path='fourslash.ts' />

/////*a*/foo && foo.bar;/*b*/
////let baz;
/////*c*/baz && baz.biz;/*d*/

// Require at minimum that the first symbol in chain exists. TODO: can we relax this requirement for non-strict JS users?
goTo.select("a", "b");
verify.not.refactorAvailable("Convert to optional chain expression");

goTo.select("c", "d");
verify.refactorAvailable("Convert to optional chain expression")