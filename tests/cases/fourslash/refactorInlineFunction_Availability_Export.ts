/// <reference path='fourslash.ts' />

//// export function /*z*/foo/*y*/() { return 42; }
//// function bar() { const meaningOfLife = /*x*/foo/*w*/(); }

goTo.select("z", "y");
verify.not.refactorAvailable("Inline function", "Inline all");
verify.not.refactorAvailable("Inline function", "Inline here");

goTo.select("x", "w");
verify.not.refactorAvailable("Inline function", "Inline all");
verify.not.refactorAvailable("Inline function", "Inline here");
