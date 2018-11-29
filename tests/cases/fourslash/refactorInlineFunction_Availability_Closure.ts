/// <reference path='fourslash.ts' />

//// namespace a {
////     export function /*z*/foo/*y*/() { return 42; }
//// }
//// function bar() { const meaningOfLife = /*x*/a.foo/*w*/(); }

goTo.select("z", "y");
verify.not.refactorAvailable("Inline function", "Inline all");
verify.not.refactorAvailable("Inline function", "Inline here");

goTo.select("x", "w");
verify.not.refactorAvailable("Inline function", "Inline all");
verify.not.refactorAvailable("Inline function", "Inline here");
