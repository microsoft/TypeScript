/// <reference path='fourslash.ts' />

//// let /*z*/a/*y*/;
//// const b = 2 * /*x*/a/*w*/;


goTo.select("z", "y");
verify.not.refactorAvailable("Inline local", "Inline all");
verify.not.refactorAvailable("Inline local", "Inline here");

goTo.select("x", "w");
verify.not.refactorAvailable("Inline local", "Inline all");
verify.not.refactorAvailable("Inline local", "Inline here");
