/// <reference path='fourslash.ts' />

/////*a*/foo && foo.bar;/*b*/

// Do not offer refactor for unknown symbols.
goTo.select("a", "b");
verify.not.refactorAvailable("Convert to optional chain expression")