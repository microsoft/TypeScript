/// <reference path='fourslash.ts' />

//// function /*z*/foo/*y*/() {}
//// function bar() { /*x*/foo/*w*/(); }

goTo.select("z", "y");
verify.not.refactorAvailable("Inline function", "Inline all");
verify.not.refactorAvailable("Inline function", "Inline here");

goTo.select("x", "w");
verify.not.refactorAvailable("Inline function", "Inline all");
verify.not.refactorAvailable("Inline function", "Inline here");
