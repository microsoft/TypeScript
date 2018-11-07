/// <reference path='fourslash.ts' />

//// namespace a {
////     const meaningOfLife = 42;
////     export function /*z*/foo/*y*/() { return meaningOfLife; }
//// }
//// function bar() { const meaningOfLife = /*x*/a.foo/*w*/(); }

goTo.select("z", "y");
verify.not.refactorAvailable("Inline function", "Inline all");
verify.not.refactorAvailable("Inline function", "Inline here");

goTo.select("x", "w");
verify.not.refactorAvailable("Inline function", "Inline all");
verify.not.refactorAvailable("Inline function", "Inline here");
