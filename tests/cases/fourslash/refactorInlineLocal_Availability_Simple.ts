/// <reference path='fourslash.ts' />

//// const /*z*a/*y*/ = 42-3;
//// const b = 2 * /*x*/a/*w*/;

goTo.select("z", "y");
verify.refactorAvailable("Inline local", "Inline all");
verify.not.refactorAvailable("Inline local", "Inline here");

goTo.select("x", "w");
verify.refactorAvailable("Inline local", "Inline all");
verify.refactorAvailable("Inline local", "Inline here");
