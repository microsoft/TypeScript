/// <reference path='fourslash.ts' />

/////*a*/foo && foo.bar;/*b*/

goTo.select("a", "b");
verify.refactorAvailable("Convert to optional chain expression")